import { handleActions } from 'redux-actions'
import {
  TOGGLE_LOGGED_IN,
  TOGGLE_PLAY_AS_GUEST,
  SET_USER,
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
  user: {},
  incorrectTriviaCount: 0,
}

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions({
  [TOGGLE_LOGGED_IN]: (state, action) => {
    const { loggedIn } = state
    const newLoggedIn = !loggedIn

    return {
      ...state,
      loggedIn: newLoggedIn,
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
  [SET_USER]: (state, user) => {
    return {
      ...state,
      user,
    }
  },
}, initialState)
