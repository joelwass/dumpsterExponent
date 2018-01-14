import {
  TOGGLE_LOGGED_IN,
  TOGGLE_PLAY_AS_GUEST,
  SET_USER,
  BUMP_CORRECT_TRIVIA,
  BUMP_INCORRECT_TRIVIA,
  BUMP_VOCAB_COUNT,
  BUMP_SKIPPED_TRIVIA,
} from './constants'

export const toggleLoggedIn = () => {
  return {
    type: TOGGLE_LOGGED_IN,
  }
};
export const incrementScore = () => {
  return {
    type: BUMP_CORRECT_TRIVIA,
  }
};
export const bumpSkippedTrivia = () => {
  return {
    type: BUMP_SKIPPED_TRIVIA,
  }
};
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      user
    }
  }
};
export const bumpIncorrectTrivia = () => {
  return {
    type: BUMP_INCORRECT_TRIVIA,
  }
};
export const bumpVocabCount = () => {
  return {
    type: BUMP_VOCAB_COUNT,
  }
};
