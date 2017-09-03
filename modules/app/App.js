import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux'

import {
  SplashPage,
  TriviaPage,
  StatsPage,
  LoginPage,
  VocabPlayPage,
  TopNewsPage,
} from '../../components';
import * as actions from './actions';

const App = StackNavigator({
  Home: { screen: SplashPage },
  Trivia: { screen: TriviaPage },
  Vocab: { screen: VocabPlayPage },
  Stats: { screen: StatsPage },
  Login: { screen: LoginPage },
  TopNews: { screen: TopNewsPage },
});

App.displayName = 'Dumpster';
App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
    loggedIn: state.Dumpster.loggedIn,
    username: state.Dumpster.username,
    correctTriviaCount: state.Dumpster.correctTriviaCount,
    incorrectTriviaCount: state.Dumpster.incorrectTriviaCount,
    vocabCount: state.Dumpster.vocabCount,
  }),
  (dispatch) => ({
    toggleLoggedIn: () => dispatch(actions.toggleLoggedIn()),
    bumpCorrectTrivia: () => dispatch(actions.bumpCorrectTrivia()),
    setUsername: (username) => dispatch(actions.setUsername(username)),
    bumpIncorrectTrivia: () => dispatch(actions.bumpIncorrectTrivia()),
    bumpVocabCount: () => dispatch(actions.bumpVocabCount()),
  })
)(App)
