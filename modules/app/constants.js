//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'Dumpster';

//action types
export const TOGGLE_LOGGED_IN = `${NAME}/TOGGLE_LOGGED_IN`;
export const TOGGLE_PLAY_AS_GUEST = `${NAME}/TOGGLE_PLAY_AS_GUEST`;
export const BUMP_CORRECT_TRIVIA = `${NAME}/BUMP_CORRECT_TRIVIA`;
export const SET_USERNAME = `${NAME}/SET_USERNAME`;
export const SET_USERID = `${NAME}/SET_USERID`;
export const BUMP_INCORRECT_TRIVIA = `${NAME}/BUMP_INCORRECT_TRIVIA`;
export const BUMP_VOCAB_COUNT = `${NAME}/BUMP_VOCAB_COUNT`;
export const BUMP_SKIPPED_TRIVIA = `${NAME}/BUMP_SKIPPED_TRIVIA`;
//as you can see above, each action is namespaced with module's name.
