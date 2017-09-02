import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Platform,
  StatusBar,
  Alert,
  Text,
  TouchableHighlight,
} from 'react-native';

import * as Exponent from 'expo';
import * as Api from '../../api/api.js';
import { LoadingPage } from '../../components';

import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';

class TopNewsPage extends React.Component {

  static navigationOptions = {
    title: 'Today\'s Top News',
  };

  state = {
    modalVisible: false,
    isReady: false,
  };

  componentWillMount() {
    this._getTopNews();
    console.log('component will mount?');
  };

  _getTopNews = () => {
    Api.getNewsSources();
  };

  _setModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  _setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    if (!this.state.isReady) {
      return <LoadingPage />;
    }

    return (
      <View style={ styles.container }>

      </View>
    )
  }
}

TopNewsPage.propTypes = {
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(TopNewsPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
  },
});
