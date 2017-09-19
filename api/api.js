const newsSources = ['bbc-news', 'techcrunch', 'the-washington-post', 'the-new-york-times', 'the-wall-street-journal', 'associated-press', 'bloomberg',  'business-insider', 'google-news', 'fortune', 'buzzfeed'];
const prodPrefix = 'https://dumpster.herokuapp.com/api/v1';
const localPrefix = 'http://localhost:3000/api/v1';

class ApiService {
  constructor() {
    this.vocabWords = [];
    this.triviaQuestions = [];
    this.triviaIndex = 0;
    this.newsSourceData = [];
  }

  // get trivia questions from database and store them locally
  getTriviaQuestion() {
    console.log(this.newsSourceData.length);
    return new Promise((resolve, reject) => {
      // if we have questions already, just return the next one, if not, grab them all again
      if (this.triviaQuestions.length === this.triviaIndex) {
        return fetch(`${prodPrefix}/trivia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(result => result.json()).then(result => {
            if (result.success !== 'true') Promise.reject(result.message);
            // get out the trivia questions from the response
            this.triviaIndex = 0;
            return shuffle(result.trivia);
          })
          .then(result => {
            this.triviaQuestions = result;
            resolve(this.triviaQuestions[this.triviaIndex]);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        this.triviaIndex++;
        resolve(this.triviaQuestions[this.triviaIndex]);
      }
    });
  }

  // get previous trivia question
  getPreviousTriviaQuestion() {
    return new Promise((resolve, reject) => {
      if (this.triviaIndex !== 0) this.triviaIndex--;
      resolve(this.triviaQuestions[this.triviaIndex]);
    });
  }

  // get vocab terms from third party and store them locally as well as in our own db - need to look for collisions based on word
  getVocabTerm() {
    return new Promise((resolve, reject) => {
      // use testing keys
      console.log(this.vocabWords.length);
      if (this.vocabWords.length === 0) {
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
          this.vocabWords = result;
          return resolve(this.vocabWords.shift());
        }).catch(err => reject(err));
      } else {
        resolve(this.vocabWords.shift());
      }
    });
  }

  getVocabWordDetails(word) {
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
  }

  // update the db with the current state being the score, question indexes, etc.
  updateDBWithUserState() {

  }

  // authenticate a use to see if they are logged in or logged out with their current tokens
  authenticate() {

  }

  // sign out for a user
  signOut() {

  }

  getNewsSources() {
    return new Promise((resolve, reject) => {
      console.log('fetching news sources');
      console.log(this.newsSourceData.length);
      if (this.newsSourceData.length) resolve(this.newsSourceData);
      return fetch(`${prodPrefix}/fetchNewsSources`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(result => result.json())
        .then(result => {
          const sources = result.results.sources;
          const returnSources = sources.filter(source => newsSources.includes(source.id));
          this.newsSourceData = returnSources;
          resolve(returnSources);
        }).catch(err => reject(err));
    });
  }

  getNewsFromSource(source) {
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
  }

  createAccount(email, password) {
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
  }

  // sign in for a user
  signIn(email, password) {
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
  }
}

export default new ApiService();

const shuffle = (a) => {
  return new Promise( (resolve, reject) => {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    resolve(a);
  })
};
