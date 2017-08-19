import {
  TOGGLE_LOGGED_IN,
  TOGGLE_PLAY_AS_GUEST,
  SET_USERNAME,
  SET_USERID,
  BUMP_CORRECT_TRIVIA,
  BUMP_INCORRECT_TRIVIA,
  BUMP_VOCAB_COUNT,
  BUMP_SKIPPED_TRIVIA,
} from './constants'

//each action should have the following signiture.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newCounter action
//  }

export const toggleLoggedIn = () => {
  return {
    type: TOGGLE_LOGGED_IN,
  }
};
export const setUserId = (userId) => {
  return {
    type: SET_USERID,
    payload: {
      userId
    }
  }
};
export const togglePlayAsGuest = () => {
  return {
    type: TOGGLE_PLAY_AS_GUEST,
  }
};
export const bumpCorrectTrivia = () => {
  return {
    type: BUMP_CORRECT_TRIVIA,
  }
};
export const bumpSkippedTrivia = () => {
  return {
    type: BUMP_SKIPPED_TRIVIA,
  }
};
export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: {
      username
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
