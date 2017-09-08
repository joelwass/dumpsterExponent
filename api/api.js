const newsSources = ['bbc-news', 'techcrunch', 'the-washington-post', 'the-new-york-times', 'the-wall-street-journal', 'associated-press', 'bloomberg',  'business-insider', 'google-news', 'fortune', 'buzzfeed'];
const prodPrefix = 'https://dumpster.herokuapp.com/api/v1';
const localPrefix = 'http://localhost:3000/api/v1';

module.exports = {

  vocabWords: [],
  triviaQuestions: [],
  triviaIndex: 0,

  // get trivia questions from database and store them locally
  getTriviaQuestion: function() {
    return new Promise((resolve, reject) => {
      // if we have questions already, just return the next one, if not, grab them all again
      if (module.exports.triviaQuestions.length === module.exports.triviaIndex) {
        return fetch(`${prodPrefix}/trivia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(result => result.json()).then(result => {
            if (result.success !== 'true') Promise.reject(result.message);
            // get out the trivia questions from the response
            module.exports.triviaIndex = 0;
            return shuffle(result.trivia);
          })
          .then(result => {
            module.exports.triviaQuestions = result;
            resolve(module.exports.triviaQuestions[module.exports.triviaIndex]);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        module.exports.triviaIndex++;
        resolve(module.exports.triviaQuestions[module.exports.triviaIndex]);
      }
    });
  },
  // get previous trivia question
  getPreviousTriviaQuestion: function() {
    return new Promise((resolve, reject) => {
      if (module.exports.triviaIndex !== 0) module.exports.triviaIndex--;
      resolve(module.exports.triviaQuestions[module.exports.triviaIndex]);
    });
  },
  // get vocab terms from third party and store them locally as well as in our own db - need to look for collisions based on word
  getVocabTerm: function() {
    return new Promise((resolve, reject) => {
      // use testing keys
      console.log(module.exports.vocabWords.length);
      if (module.exports.vocabWords.length === 0) {
        console.log('fetching new words');
        return fetch(`${prodPrefix}/fetchVocab`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(result => result.json()).then(result => {
          console.log(result);
          if (!result.results || !result.results.results || !result.results.results.data) return Promise.reject(new Error('error getting vocab'));
          return shuffle(result.results.results.data);
        }).then(result => {
          module.exports.vocabWords = result;
          return resolve(module.exports.vocabWords.shift());
        }).catch(err => reject(err));
      } else {
        resolve(module.exports.vocabWords.shift());
      }
    });
  },
  getVocabWordDetails: function(word) {
    return new Promise((resolve, reject) => {
      console.log('fetching vocab word details');
      return fetch(`${prodPrefix}/fetchVocabDetails?word=${word}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(result => result.json()).then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  // update the db with the current state being the score, question indexes, etc.
  updateDBWithUserState: function() {

  },
  // authenticate a use to see if they are logged in or logged out with their current tokens
  authenticate: function() {

  },
  // sign out for a user
  signOut: function() {

  },
  getNewsSources: function() {
    return new Promise((resolve, reject) => {
      console.log('fetching news sources');
      return fetch(`${prodPrefix}/fetchNewsSources`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(result => result.json())
        .then(result => {
          const sources = result.results.sources;
          const returnSources = sources.filter(source => newsSources.includes(source.id));
          resolve(returnSources);
        }).catch(err => reject(err));
    });
  },
  getNewsFromSource: function(source) {
    return new Promise((resolve, reject) => {
      console.log('fetching news');
      return fetch(`${prodPrefix}/fetchNews?source=${source}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(result => result.json())
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  createAccount: function(email, password) {
    console.log('create account');
    const body = {
      email: email,
      password: password,
    };

    return fetch(`${prodPrefix}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(result => result.json())
      .then(result => result)
      .catch(err => err);
  },
  // sign in for a user
  signIn: function(email, password) {
    console.log('signing in');
    const body = {
      email: email,
      password: password,
    };

    return fetch(`${prodPrefix}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(result =>  result.json()).then(result => {
      return result;
    }).catch(err => {
      console.log(err);
    });
  },
};

const shuffle = (a) => {
  return new Promise( (resolve, reject) => {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    resolve(a);
  })
};
