

module.exports = {

  vocabWords: [],
  triviaQuestions: [],

  // get trivia questions from database and store them locally
  getTriviaQuestion: function() {
    console.log('getting trivia');

    return new Promise((resolve, reject) => {
      // if we have questions already, just return the next one, if not, grab them all again
      if (module.exports.triviaQuestions.length === 0) {
        return fetch(`https://dumpster.herokuapp.com/api/v1/trivia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(result => result.json()).then(result => {
            if (result.success !== 'true') Promise.reject(result.message);
            // get out the trivia questions from the response
            return shuffle(result.trivia);
          })
          .then(result => {
            module.exports.triviaQuestions = result;
            resolve(module.exports.triviaQuestions.shift());
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve(module.exports.triviaQuestions.shift());
      }
    });
  },
  // get vocab terms from third party and store them locally as well as in our own db - need to look for collisions based on word
  getVocabTerm: function() {

    return new Promise((resolve, reject) => {
      // use testing keys
      // test key: 0pxNGynXHHmshVuo4XDx3cymsD3mp1OnzyZjsnqhE31IKFCcrW
      console.log(module.exports.vocabWords.length);
      if (module.exports.vocabWords.length === 0) {
        console.log('fetching new words');
        const randomPage = parseInt(Math.random() * 100); // get random page between 1 and 10;
        return fetch(`https://wordsapiv1.p.mashape.com/words/?hasDetails=hasUsages,hasCategories&page=${randomPage}&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Mashape-Key': '0pxNGynXHHmshVuo4XDx3cymsD3mp1OnzyZjsnqhE31IKFCcrW',
          },
        }).then(result => result.json()).then(result => {
            console.log(result.results.data.length);
            return shuffle(result.results.data);
          })
          .then(result => {
            module.exports.vocabWords = result;
            resolve(module.exports.vocabWords.shift());
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve(module.exports.vocabWords.shift());
      }
    });
  },
  getVocabWordDetails: function(word) {

    return new Promise((resolve, reject) => {
      // test key: 0pxNGynXHHmshVuo4XDx3cymsD3mp1OnzyZjsnqhE31IKFCcrW
      console.log('fetching vocab word details');
      return fetch(`https://wordsapiv1.p.mashape.com/words/${word}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Mashape-Key': '0pxNGynXHHmshVuo4XDx3cymsD3mp1OnzyZjsnqhE31IKFCcrW',
        }
      }).then(result => result.json()).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
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
  createAccount: function(email, password) {
    console.log('create account');
    const body = {
      email: email,
      password: password,
    };

    return fetch(`https://dumpster.herokuapp.com/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(result => {
        return result.json()
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  },
  // sign in for a user
  signIn: function(email, password) {
    console.log('signing in');
    const body = {
      email: email,
      password: password,
    };

    return fetch(`https://dumpster.herokuapp.com/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(result =>  result.json())
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  },
};

const shuffle = (a) => {
  console.log('shuffling');
  return new Promise( (resolve, reject) => {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    resolve(a);
  })
}
