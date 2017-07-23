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
import { LearnMoreModal, LoadingPage } from '../../components';

import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';

class TriviaPage extends React.Component {

  state = {
    appIsReady: false,
    answers: ['loading...', 'loading...', 'loading...', 'loading...'],
    currentQuestion: {},
    modalVisible: false,
    isReady: false,
  }

  componentWillMount() {
    this._getNextQuestion();
  }

  _setAnswers = (question) => {
    let answers = [question.answer,
      question.incAnswer1,
      question.incAnswer2,
      question.incAnswer3
    ];

    let correctAnswerIndex = Math.floor(Math.random() * 4);
    this.setState({ correctAnswerIndex });

    // swap the correct answer into a random index
    let tmpCorrectAnswer = answers[0];
    answers[0] = answers[correctAnswerIndex];
    answers[correctAnswerIndex] = tmpCorrectAnswer;

    this.setState({ answers, isReady: true });
  }

  _getNextQuestion = async () => {
    this.setState({ isReady: false });
    try {
      const currentQuestion = await Api.getTriviaQuestion();
      this._setAnswers(currentQuestion);
      this.setState({currentQuestion});
    } catch (e) {
      console.log(e);
    }
  }

  _setModalVisible = () => {
    this.setState({ modalVisible: true });
  }

  _setModalInvisible = () => {
    this.setState({ modalVisible: false });
  }

  _answerSelected = (i) => {
    if (i === this.state.correctAnswerIndex) { // correct answer selected
      Alert.alert('Correct!', null,
        [
          {text: 'Learn More', onPress: () => this._setModalVisible()},
          {text: 'Next', onPress: () => this._getNextQuestion()},
        ],
        { cancelable: true }
      );
      this.props.bumpCorrectTrivia();
    } else { // incorrect answer selected
      this.props.bumpIncorrectTrivia();
    }
  }

  _skipQuestion = () => {
    // increment skipped questions
    this.props.bumpSkippedTrivia();
    // then get next question
    this._getNextQuestion();
  }

  render() {
    if (!this.state.isReady) {
      return <LoadingPage />;
    }

    return (
      <View style={ styles.container }>

        <TouchableHighlight onPress={() => this.props.navigator.pop()}>
          <Text>Exit</Text>
        </TouchableHighlight>

        <View>
          <Text
            style={ [styles.title ] }
            selectable={ true }
            accessible={ true }
            numberOfLines={ 5 }>
            { this.state.currentQuestion.question }
          </Text>
        </View>

        {
          this.state.answers.map((item, i) => {
            if (i === this.state.correctAnswerIndex) {
              return (
                <TouchableHighlight
                  key={ i }
                  underlayColor="grey"
                  onPress={ () => this._answerSelected(i) }
                  style={ [styles.answerButton] }>
                  <Text
                    style={ [styles.answerText] }>
                    { item }
                  </Text>
                </TouchableHighlight>
              );
            } else {
              return (
                <TouchableHighlight
                  key={ i }
                  underlayColor="red"
                  onPress={ () => this._answerSelected(i) }
                  style={ [styles.answerButton] }>
                  <Text
                    style={ [styles.answerText] }>
                    { item }
                  </Text>
                </TouchableHighlight>
              );
            }
          })
        }

        <TouchableHighlight style={ styles.body } onPress={() => this._skipQuestion() }>
          <Text style={ styles.helperButtons }>Next Question</Text>
        </TouchableHighlight>

        <LearnMoreModal modalVisible={ this.state.modalVisible }
          correctAnswer={ this.state.answers[this.state.correctAnswerIndex] }
          closeModal={ this._setModalInvisible.bind(this) }/>

      </View>
    )
  }
}

TriviaPage.propTypes = {
  bumpCorrectTrivia: PropTypes.func.isRequired,
  bumpIncorrectTrivia: PropTypes.func.isRequired,
  bumpSkippedTrivia: PropTypes.func.isRequired,
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    bumpIncorrectTrivia: () => dispatch(actions.bumpIncorrectTrivia()),
    bumpCorrectTrivia: () => dispatch(actions.bumpCorrectTrivia()),
    bumpSkippedTrivia: () => dispatch(actions.bumpSkippedTrivia()),
  })
)(TriviaPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    flexDirection:'column',
  },
  title: {
    fontSize: 20,
    marginTop: 60,
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
  },
  answerText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  helperButtons: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
  answerButton: {
    alignSelf: 'stretch',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 40,
    marginTop: 5,
    marginRight: 40,
    borderRadius: 10,
  }
});
