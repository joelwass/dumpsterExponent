import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Platform,
  StatusBar,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../modules/app/actions';
import { LoadingPage } from '../../components';

import Expo, {
  Asset,
  Font,
} from 'expo';
const gifAddress = require('../../assets/images/DumpLoopTrans2.gif');
import * as Api from '../../api/api.js';

class SplashPage extends React.Component {

  state = {
    isReady: false,
  };

  componentWillMount() {
    console.log(this.props.navigator);
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    await Promise.all([
      Asset.fromModule(gifAddress).downloadAsync(),
    ]);
    this.setState({ isReady: true });
  }

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
          source={ gifAddress }
          resizeMode="contain"
        />

        { (this.props.loggedIn || this.props.playAsGuest) &&
          <View>
            <TouchableHighlight
              onPress= { () => this.props.navigator.push({ id: 'trivia' }) }
              style={ styles.button }>
              <Text style={ styles.buttonText }>
                Trivia Builder
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress= { () => this.props.navigator.push({ id: 'vocab' }) }
              style={ styles.button }>
              <Text style={ styles.buttonText }>
                Vocab Builder
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress= { () => this.props.navigator.push({ id: 'stats' }) }
              style={ styles.button }>
              <Text style={ styles.buttonText }>
                Stats
              </Text>
            </TouchableHighlight>

            { this.props.loggedIn ?
              (
                <TouchableHighlight
                  onPress= { () => this.props.toggleLoggedIn() }
                  style={ styles.button }>
                  <Text style={ styles.buttonText }>
                    Log Out
                  </Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  onPress= { () => this.props.togglePlayAsGuest() }
                  style={ styles.button }>
                  <Text style={ styles.buttonText }>
                    Leave Guest Session
                  </Text>
                </TouchableHighlight>
              )
            }
          </View>
        }

        { !(this.props.loggedIn || this.props.playAsGuest) &&
          <View style={ styles.container }>
            <TouchableHighlight
              onPress={ () => this.props.navigator.push({ id: 'login' }) }
              style={ styles.button }>
              <Text style={ styles.buttonText }>
                Sign In
              </Text>
            </TouchableHighlight>

            <Text>Or</Text>

            <TouchableHighlight
              onPress ={ () => this.props.togglePlayAsGuest() }
              style={ styles.button }>
              <Text style={ styles.buttonText }>Play as guest</Text>
            </TouchableHighlight>
          </View>
        }

      </View>
    )
  }
}

SplashPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  toggleLoggedIn: PropTypes.func.isRequired,
};

// all state and dispatch actions - this could get messy
export default connect(
  (state) => ({
    loggedIn: state.Dumpster.loggedIn,
    playAsGuest: state.Dumpster.playAsGuest,
    username: state.Dumpster.username,
  }),
  (dispatch) => ({
    toggleLoggedIn: () => dispatch(actions.toggleLoggedIn()),
    togglePlayAsGuest: () => dispatch(actions.togglePlayAsGuest()),
  })
)(SplashPage)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dumpsterTitle: {
    marginTop: 5,
    fontSize: 32,
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
    fontSize: 20,
  },
  button: {
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 4,
    width: 250,
    alignItems: 'center',
    height: 30,
  },
});
