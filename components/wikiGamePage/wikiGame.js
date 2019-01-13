import React from 'react';
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
import { Entypo } from '@expo/vector-icons';
import Api from '../../api/api.js';
import { LearnMoreModal, LoadingPage } from '../../components';

import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';
import { composeAsync } from 'expo/build/MailComposer/MailComposer';

class WikiGamePage extends React.Component {
  static navigationOptions = {
    title: 'Wiki Game',
  };

  state = {
    appIsReady: false,
    answers: ['loading...', 'loading...', 'loading...', 'loading...'],
    currentWikiQuestion: {},
    modalVisible: false,
    isReady: false,
    timerSeconds: 15,
    timerColor: 'black',
  };

  componentWillMount() {
    this._getNextQuestion();
  };

  _setTimerTick = () => {
    if (this.state.timerSeconds <= 0) {
      clearTimeout(this.state.intervalHandle)
      // pop a modal
      Alert.alert(`Out of time! ${this.state.answers[this.state.correctAnswerIndex]} is the correct answer`, null,
        [
          {text: 'Learn More', onPress: () => this._setModalVisible()},
          {text: 'Next', onPress: () => this._getNextQuestion()},
        ],
        { cancelable: true }
      );
      return
    } else if (this.state.timerSeconds <= 5) {
      this.setState({
        timerColor: 'red'
      })
    }
    this.setState({ 
      timerSeconds: parseFloat(this.state.timerSeconds - .1).toFixed(1),
      hurryUp: (this.state.timerSeconds < 8)
     })
  }

  _setAnswers = (question) => {
    clearTimeout(this.state.intervalHandle)
    const interval = setInterval(this._setTimerTick, 100)
    this.setState({ intervalHandle: interval })
    let answers = [question.correctWiki.title,
      question.incorrectWikis[0].title,
      question.incorrectWikis[1].title,
      question.incorrectWikis[2].title
    ];

    let correctAnswerIndex = Math.floor(Math.random() * 4);
    this.setState({ correctAnswerIndex, currentWikiQuestion: question });

    // swap the correct answer into a random index
    let tmpCorrectAnswer = answers[0];
    answers[0] = answers[correctAnswerIndex];
    answers[correctAnswerIndex] = tmpCorrectAnswer;

    this.setState({ answers, isReady: true });
  };

  _getNextQuestion = async () => {
    this.setState({ isReady: false, timerSeconds: 15 });
    try {
      const currentWikiQuestion = await Api.getWikiOptions();
      this._setAnswers(currentWikiQuestion);
    } catch (e) {
      console.log(e);
    }
  };

  _setModalVisible = () => {
    this.setState({ modalVisible: true });
  };

  _setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  _answerSelected = (i) => {
    if (i === this.state.correctAnswerIndex) { // correct answer selected
      clearTimeout(this.state.intervalHandle)
      Alert.alert(`Correct! ${this.state.answers[this.state.correctAnswerIndex]} is the correct answer`, null,
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
  };

  _getPreviousQuestion = async () => {
    try {
      const currentWikiQuestion = await Api.getPreviousWikiOption();
      this._setAnswers(currentWikiQuestion);
    } catch (e) {
      console.log(e);
    }
  };

  _skipQuestion = () => {
    // increment skipped questions
    this.props.bumpSkippedTrivia();
    // then get next question
    this._getNextQuestion();
  };

  render() {
    if (!this.state.isReady) {
      return <LoadingPage />;
    }

    return (
      <View style={ styles.container }>

        <TouchableHighlight
          ref="backAngleBracket"
          style={ styles.backAngleBracket }
          onPress={ () => this._getPreviousQuestion() }
          activeOpacity={0}
          underlayColor='transparent'>
          <Entypo name="chevron-thin-left" size={40} color="blue"/>
        </TouchableHighlight>

        <View ref="questionDisplayView"
              style={ styles.questionDisplay }>
          <View ref="timerView" style={ styles.timer }>
            <Text style={{color: this.state.timerColor}}>
              { this.state.timerSeconds } s
            </Text>
          </View>
          <View ref="timerView" style={ styles.timer }>
            { this.state.hurryUp && <Text style={ styles.timerFont }>
              Hurry Up!
            </Text> }
          </View>
          <View>
            <Text
              style={ [styles.title ] }
              selectable={ true }
              accessible={ true }
              numberOfLines={ 8 }>
              { this.state.currentWikiQuestion.correctWiki.extract }
            </Text>
          </View>

          {
            this.state.answers.map((item, i) => {
              if (i === this.state.correctAnswerIndex) {
                return (
                  <TouchableHighlight
                    key={ i }
                    underlayColor="green"
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

          <TouchableHighlight style={ styles.nextQuestion } onPress={() => this._skipQuestion() }>
            <Text style={ styles.helperButtons }>Next Question</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          ref="forwardAngleBracket"
          style={ styles.forwardAngleBracket }
          onPress={ () => this._skipQuestion() }
          activeOpacity={0}
          underlayColor='transparent'>
          <Entypo name="chevron-thin-right" size={40} color="blue"/>
        </TouchableHighlight>

        <LearnMoreModal modalVisible={ this.state.modalVisible }
                        correctAnswer={ this.state.currentWikiQuestion.correctWiki.pageId }
                        closeModal={ this._setModalInvisible.bind(this) }/>

      </View>
    )
  }
}

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    bumpIncorrectTrivia: () => dispatch(actions.bumpIncorrectTrivia()),
    bumpCorrectTrivia: () => dispatch(actions.bumpCorrectTrivia()),
    bumpSkippedTrivia: () => dispatch(actions.bumpSkippedTrivia()),
  })
)(WikiGamePage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'row',
  },
  title: {
    fontSize: 20,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginLeft: 20,
    marginTop: 5,
    marginRight: 20,
    borderRadius: 10,
  },
  nextQuestion: {
    alignItems: 'center',
  },
  forwardAngleBracket: {
    height: 100,
    flex: 1,
  },
  backAngleBracket: {
    height: 100,
    flex: 1,
  },
  questionDisplay: {
    flex: 8,
  },
  timer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timerFont: {
    position: 'absolute',
    fontSize: 24,
  }
});
