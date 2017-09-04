import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

export default class LoadingPage extends React.Component {

  state = {
  }

  componentWillMount() {
  }

  render() {
    return (
      <View style={ styles.container }>
        <ActivityIndicator
          animating={ true }
          style={[styles.centering, { height: 80 }]}
          size="large">
        </ActivityIndicator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
