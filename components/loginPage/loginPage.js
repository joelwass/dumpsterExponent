import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableHighlight,
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

  state = {}

  _loginWithFacebook = async () => {
    const { type, token, expires } = await Expo.Facebook.logInWithReadPermissionsAsync('923608721056131', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      const responseJson = await response.json();
      this.props.toggleLoggedIn();
      this.props.setUserId(responseJson.id);
      Alert.alert(
        'Logged in!',
        `Hi ${responseJson.name}!`
      );
    } else if (type === 'cancel') {
      // do something if the user cancelled the login request

    }
  };

  _loginUserOnBackend = async () => {

  }

  render() {
    return (
      <View style={ styles.container }>
          <TouchableHighlight
            onPress={ this._loginWithFacebook }>
            <Text>Login with Facebook</Text>
          </TouchableHighlight>
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
    setUserId: (userId) => dispatch(actions.setUserId(userId)),
  })
)(LoginPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});
