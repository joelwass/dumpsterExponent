import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { connect } from 'react-redux'

import {
  SplashPage,
  TriviaPage,
  StatsPage,
  LoginPage,
  VocabPlayPage,
  TopNewsPage,
  ArticleModal,
  WikiGamePage,
} from '../../components';
import * as actions from './actions';

const RootStack = createStackNavigator({
  Home: { screen: SplashPage },
  Trivia: { screen: TriviaPage },
  WikiGame: { screen: WikiGamePage },
  Vocab: { screen: VocabPlayPage },
  Stats: { screen: StatsPage },
  Login: { screen: LoginPage },
  TopNews: { screen: TopNewsPage },
  Article: { screen: ArticleModal },
});

const App = createAppContainer(RootStack);

App.displayName = 'Dumpster';

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
