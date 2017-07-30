import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';

import Expo, {
  Font,
} from 'expo';
import * as Api from '../../api/api.js';

class LoginPage extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  state = {
    loginSignUp: 'Sign In',
    emailText: '',
    passwordText: '',
    helperText: "Don't have a Dumpster account yet? ",
    helperLinkText: 'Create a free account',
    shouldShowPasswordReset: true,
  }

  _testCredentials = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if (!re.test(this.state.emailText.toLowerCase())) {
       this.showAlert('Error', 'Email not a valid email address');
     } else if (this.state.passwordText.length < 3) {
       this.showAlert('Error', 'Password is too short (minimum is 6 characters)');
     } else {
      this._handleSignUpOrLogInButtonPressed();
     }
  }

  _handleSignUpOrLogInButtonPressed = async () => {

    if (this.state.loginSignUp === 'Sign In') {
      let signInResults = await Api.signIn(this.state.emailText, this.state.passwordText);

      console.log(signInResults);
      if (!!signInResults.success) {
        this.props.toggleLoggedIn(this.state.emailText, this.state.passwordText);
        this.props.navigation.goBack(null);
      } else {
        this.showAlert('Error', signInResults.message);
      }
    } else if (this.state.loginSignUp === 'Create Account') {
      let createAccountResults = await Api.createAccount(this.state.emailText, this.state.passwordText);

      console.log(createAccountResults);
      if (!!createAccountResults.success) {
        this.props.toggleLoggedIn(this.state.emailText, this.state.passwordText);
        this.props.navigation.goBack(null);
      } else {
        this.showAlert('Error', createAccountResults.message);
      }
    }
  }

  _switchLoginState = () => {
    switch (this.state.loginSignUp) {
      case 'Sign In':
        this.setState({ loginSignUp: 'Create Account', helperText: 'Already have an account? ',
          helperLinkText: 'Sign In', shouldShowPasswordReset: false
        });
        break;
      case 'Create Account':
        this.setState({ loginSignUp: 'Sign In', helperText: "Don't have a Dumpster account yet? ",
          helperLinkText: 'Create a free account', shouldShowPasswordReset: true
        });
        break;
      default:
        console.log('should never hit switch state');
    }
  }

  _passwordResetLink = () => {
    if (this.state.shouldShowPasswordReset) {
      return 'forgot your password'
    }
  }

  _showPasswordReset = () => {
    if (this.state.shouldShowPasswordReset) {
      return '...or maybe you '
    }
  }

  showAlert(title, message) {
    Alert.alert(title, message,
      [
        { text: 'OK', onPress: () => { } },
      ]
    )
  }

  render() {
    console.log(this.props);
    return (
      <View style={ styles.container }>

        <View style={ styles.loginFieldsContainer }>
          <Text style={ [styles.emailOrPasswordTitleText, styles.textHelper] }>
            Email
          </Text>

          <View style={ styles.emailPasswordTextInputContainer }>
            <TextInput style={ styles.emailPasswordTextInput }
              underlineColorAndroid='rgba(0,0,0,0)' //sets the underline on android to transparent
              onChangeText={ (text) => this.setState({ emailText: text.toLowerCase().trim() })}
              value={ this.state.emailText }
            />
          </View>

          <Text style={ [styles.emailOrPasswordTitleText, styles.textHelper] }>
            Password
          </Text>

          <View style={ styles.emailPasswordTextInputContainer }>
            <TextInput style={ [styles.emailPasswordTextInput, styles.textHelper] }
              underlineColorAndroid='rgba(0,0,0,0)' //sets the underline on android to transparent
              secureTextEntry={ true }
              onChangeText={ (text) => this.setState({ passwordText: text })}
              value={ this.state.passwordText }
            />
          </View>

          <View style={ styles.signUpOrLogInButtonContainer }>
            <TouchableHighlight
              onPress= { this._testCredentials }
              style={ styles.signUpOrLogInButton }>
              <Text style={ [styles.signUpOrLogInButtonTitleText, styles.textHelper] }>
                { this.state.loginSignUp }
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={ styles.helperTextContainer }>
          <Text style={ styles.helperText }>
            { this.state.textHelper }
          </Text>
          <Text style={ [styles.linkSignInLogInText, styles.textHelper] }
            onPress= { this._switchLoginState }>
            { this.state.helperLinkText }
          </Text>
        </View>

      </View>
    )
  }
}

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    toggleLoggedIn: () => dispatch(actions.toggleLoggedIn()),
    setUsername: (username) => dispatch(actions.setUsername(username)),
  })
)(LoginPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  loginFieldsContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    height: 250,
  },
  emailOrPasswordTitleText: {
    fontSize: 16,
    paddingLeft: 20,
    marginVertical: 10,
  },
  emailPasswordTextInputContainer: {
    height: 40,
    marginHorizontal: 20,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 9,
    paddingHorizontal: 6,
  },
  emailPasswordTextInput: {
    fontSize: 16,
    marginTop: 2,
    height: 36,
  },
  signUpOrLogInButton: {
    flex: 1,
    alignItems: 'center',
  },
  signUpOrLogInButtonTitleText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
  signUpOrLogInButtonContainer: {
    height: 50,
    marginHorizontal: 20,
    backgroundColor: '#26B67C',
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  helperTextContainer: {
    marginHorizontal: 40,
    marginVertical: 25,
    alignItems: 'center',
  },
  textHelper: {
    fontSize: 16,
  },
  linkSignInLogInText: {
    textDecorationLine: 'underline',
  },
});
