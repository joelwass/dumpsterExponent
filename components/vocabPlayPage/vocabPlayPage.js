import React from 'react';
import PropTypes from 'prop-types';
import {
  AsyncStorage,
  StyleSheet,
  Image,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableHighlight,
} from 'react-native';

import Expo, {
  Font,
} from 'expo';
import * as Api from '../../api/api.js';
import { VocabModal, LoadingPage } from '../../components';

import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';

class VocabPage extends React.Component {

  static navigationOptions = {
    title: 'Vocab Builder',
  };

  state = {
    isReady: false,
    currentWord: '',
    animationType: 'slide',
    modalVisible: false,
    wordDetails: {},
    error: undefined,
  }

  async componentWillMount() {
    try {
      const currentWord = await Api.getVocabTerm();
      this.setState({ currentWord: currentWord, isReady: true });
    } catch (e) {
      console.log(e);
      this.setState({ error: e.message, isReady: true });
    }
  }

  _learnMoreInfo = async () => {
    this.setState({ isReady: false });
    try {
      const value = await AsyncStorage.getItem(`@DumpsterStore:${ this.state.currentWord }`);
      if (value !== null && typeof JSON.parse(value).success === 'undefined'){

        // We have data!!
        await this.setState({ wordDetails: JSON.parse(value), isReady: true });
        this._setModalVisible();
      } else {

        // get the word details from the api
        let details;
        try {
          details = await Api.getVocabWordDetails(this.state.currentWord);
        } catch (e) {
          this.setState({ error: e.message });
        }

        // need to json stringify the details object before putting it in async storage
        // don't forget to json parse it when taking it out!
        await AsyncStorage.setItem(`@DumpsterStore:${ this.state.currentWord }`, JSON.stringify(details));
        await this.setState({ wordDetails: details.results, isReady: true });
        this._setModalVisible();
      }
    } catch (err) {
      console.log(`error: ${ err }`);
    }
  };

  _getNextWord = async () => {
    this.props.bumpVocabCount();
    this.setState({ isReady: false });
    const vocabTerm = await Api.getVocabTerm();
    this.setState({ currentWord: vocabTerm, isReady: true });
  };

  _setModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  _setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  render() {

    if (!this.state.isReady) {
      return (
        <LoadingPage />
      )
    }

    if (this.state.error) {
      return (
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Text>We're sorry.... The Vocab page is temporarily unavailable. Please try back soon!</Text>
        </View>
      )
    }

    return (
      <View style={ styles.container }>

        <Text style={ [styles.title, styles.font] }> Learn your vocab! </Text>

        <Text style={ [styles.currentWord] }> { this.state.currentWord[0].toUpperCase() + this.state.currentWord.slice(1) } </Text>

        <TouchableHighlight style={ styles.body } onPress={() => this._learnMoreInfo() }>
          <Text style={ styles.font }>Learn More</Text>
        </TouchableHighlight>

        <TouchableHighlight style={ styles.body } onPress={() => this._getNextWord() }>
          <Text style={ styles.font }>Next Term</Text>
        </TouchableHighlight>

        <VocabModal modalVisible={ this.state.modalVisible }
          wordDetails={ this.state.wordDetails }
          closeModal={ () => this._setModalInvisible() }/>

      </View>
    )
  }
}

VocabPage.propTypes = {
  bumpVocabCount: PropTypes.func.isRequired,
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    bumpVocabCount: () => dispatch(actions.bumpVocabCount()),
  })
)(VocabPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    marginTop: 100,
  },
  body: {
    marginTop: 20,
  },
  font: {
    fontSize: 18,
  },
  currentWord: {
    fontSize: 24,
    margin: 40,
  }
});
