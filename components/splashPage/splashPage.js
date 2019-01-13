import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../modules/app/actions';
import { LoadingPage } from '../../components';

import Expo, {
  Asset,
  FacebookAds,
} from 'expo';
const gifAddress = require('../../assets/images/DumpLoopTrans2.gif');

class SplashPage extends React.Component {

  static navigationOptions = {
    title: 'Home',
    header: null
  };

  state = {
    isReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    await Promise.all([
      Asset.fromModule(gifAddress).downloadAsync(),
    ]);
    this.setState({ isReady: true });
  }

  _navigateToAdThenScreen = (screen) => {
    if (Platform.OS === 'ios') {
      FacebookAds.InterstitialAdManager.showAd('923608721056131_1433457360071262')
        .then(didClick => {
          this.props.navigation.navigate(screen)
        }).catch(error => {
          this.props.navigation.navigate(screen)
      });
    } else {
      FacebookAds.InterstitialAdManager.showAd('923608721056131_1434163006667364')
        .then(didClick => {
          this.props.navigation.navigate(screen)
        }).catch(error => {
          this.props.navigation.navigate(screen)
      });
    }
  }

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
      this.props.setUser(responseJson);
      Alert.alert(
        'Logged in!',
        `Hi ${responseJson.name}!`
      );
    } else if (type === 'cancel') {
      // do something if the user cancelled the login request
      Alert.alert(
        'Boooooooo!',
        `:(`
      );
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <LoadingPage />
      )
    }

    return (
      <View style={ styles.container }>
        <View style={ styles.statusBarUnderlay } />

        <Text style={ styles.dumpsterTitle }> DUMPSTER </Text>

        <Image
          style={ styles.gifContainer }
          source={ require('../../assets/images/DumpLoopTrans2.gif') }
          resizeMode="contain"
        />

        <View>
          { !this.props.loggedIn ? (
            <View style={ styles.container }>
              <TouchableHighlight
                onPress={ this._loginWithFacebook }>
                <Text>Login with Facebook</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={ styles.container }>
              <TouchableHighlight
                onPress= { () => this.props.navigation.navigate('WikiGame') }
                style={ styles.button }
                underlayColor="#4db6ac">
                <Text style={ styles.buttonText }>
                  Play Wiki Game
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress= { () => this.props.navigation.navigate('Trivia') }
                style={ styles.button }
                underlayColor="#4db6ac">
                <Text style={ styles.buttonText }>
                  Play Trivia
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                onPress= { () => this.props.navigation.navigate('Vocab') }
                style={ styles.button }
                underlayColor="#4db6ac">
                <Text style={ styles.buttonText }>
                  Basic Vocab Builder
                </Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default connect(
  (state) => ({
    loggedIn: state.Dumpster.loggedIn,
    user: state.Dumpster.user,
  }),
  (dispatch) => ({
    toggleLoggedIn: () => dispatch(actions.toggleLoggedIn()),
    togglePlayAsGuest: () => dispatch(actions.togglePlayAsGuest()),
    setUser: () => dispatch(actions.setUser()),
  })
)(SplashPage)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dumpsterTitle: {
    marginTop: 25,
    fontSize: 28,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  gifContainer: {
    width: 300,
    height: 360,
    backgroundColor: 'white',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#00897b",
    marginTop: 6,
    marginBottom: 6,
    borderRadius: 4,
    padding: 10,
    width: 250,
    alignItems: 'center',
    shadowOffset:{  width: 4,  height: 4,  },
    shadowColor: 'gray',
    shadowOpacity: 0.5,
  },
});
