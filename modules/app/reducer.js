import { handleActions } from 'redux-actions'
import {
  TOGGLE_LOGGED_IN,
  TOGGLE_PLAY_AS_GUEST,
  SET_USERNAME,
  BUMP_CORRECT_TRIVIA,
  BUMP_INCORRECT_TRIVIA,
  BUMP_VOCAB_COUNT,
  BUMP_SKIPPED_TRIVIA,
} from './constants'

const initialState = {
  loggedIn: false,
  playAsGuest: false,
  correctTriviaCount: 0,
  skippedTriviaCount: 0,
  vocabCount: 0,
  username: '',
  incorrectTriviaCount: 0,
}

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions({
  [TOGGLE_LOGGED_IN]: (state, action) => {
    const { loggedIn } = state
    const newLoggedIn = !loggedIn

    //because payload contains the id and we already know that we are about
    //to increment the value of that id, we modify only that value by one
    console.log({
      ...state,
      loggedIn: newLoggedIn,
    });

    return {
      ...state,
      loggedIn: newLoggedIn,
    }
  },
  [TOGGLE_PLAY_AS_GUEST]: (state, action) => {
    const { playAsGuest } = state
    const newPlayAsGuest = !playAsGuest

    return {
      ...state,
      playAsGuest: newPlayAsGuest,
    }
  },
  [BUMP_CORRECT_TRIVIA]: (state, action) => {
    const { correctTriviaCount } = state
    const newCount = correctTriviaCount + 1;

    return {
      ...state,
      correctTriviaCount: newCount,
    }
  },
  [BUMP_SKIPPED_TRIVIA]: (state, action) => {
    const { skippedTriviaCount } = state
    const newCount = skippedTriviaCount + 1;

    return {
      ...state,
      skippedTriviaCount: newCount,
    }
  },
  [BUMP_VOCAB_COUNT]: (state, action) => {
    const { vocabCount } = state
    const newCount = vocabCount + 1;

    return {
      ...state,
      vocabCount: newCount,
    }
  },
  [SET_USERNAME]: (state, action) => {
    return {
      ...state,
      username: action,
    }
  },
  [BUMP_INCORRECT_TRIVIA]: (state, action) => {
    const { incorrectTriviaCount } = state
    const newCount = incorrectTriviaCount + 1;

    return {
      ...state,
      incorrectTriviaCount: newCount,
    }
  },
}, initialState)
