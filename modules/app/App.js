import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux'

import {
  SplashPage,
  TriviaPage,
  StatsPage,
  LoginPage,
  VocabPlayPage,
} from '../../components';
import * as actions from './actions';

const App = (props) => {

  _navigatorRenderScene = (route, navigator) => {
    console.log(this);
    _navigator = navigator;
    switch (route.id) {
      case 'splash':
        return (<SplashPage navigator={ _navigator } title="Splash" />);
      case 'trivia':
        return (<TriviaPage navigator={ _navigator } title="Trivia" />);
      case 'vocab':
        return (<VocabPlayPage navigator={ _navigator } title="Vocab" />);
      case 'stats':
        return (<StatsPage navigator={ _navigator } title="Stats" />);
      case 'login':
        return (<LoginPage navigator={ _navigator } title='Login' />);
    }
  }

  return (
    <Navigator
      initialRoute={{ id: 'splash' }}
      renderScene={ this._navigatorRenderScene }
    />
  )
}

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
