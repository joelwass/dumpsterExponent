import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';

import Expo from 'expo';

class StatsPage extends React.Component {

  static navigationOptions = {
    title: 'Stats',
  };

  state = {
    appIsReady: false,
  }

  componentWillMount() {

  }

  render() {

    return (
      <View style={ styles.container }>
        <Text style={ styles.title }> Stats </Text>
        <Text style={ styles.info }> Total Correct Trivia Guesses: { this.props.correctTriviaCount } </Text>
        <Text style={ styles.info }> Total Incorrect Trivia Guesses: { this.props.incorrectTriviaCount } </Text>
        <Text style={ styles.info }> Total Skipped Trivia Q's: { this.props.skippedTriviaCount } </Text>
        <Text style={ styles.info }> Total Vocab Learned: { this.props.vocabCount } </Text>
        { this.props.loggedIn ? (
            <Text style={ styles.info }> World Rank: Top 100</Text>
          ) : (
            <Text style={ styles.info }> Log in to see world and country rank </Text>
          )
        }

      </View>
    )
  }
}

ViewPropType = {
  vocabCount: PropTypes.number.isRequired,
  incorrectTriviaCount: PropTypes.number.isRequired,
  correctTriviaCount: PropTypes.number.isRequired,
  skippedTriviaCount: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
    vocabCount: state.Dumpster.vocabCount,
    incorrectTriviaCount: state.Dumpster.incorrectTriviaCount,
    correctTriviaCount: state.Dumpster.correctTriviaCount,
    skippedTriviaCount: state.Dumpster.skippedTriviaCount,
    loggedIn: state.Dumpster.loggedIn,
  }),
  (dispatch) => ({
  })
)(StatsPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    marginTop: 100,
  },
  info: {
    marginTop: 20,
  },
});
