import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './createStore';
const store = createStore();
import { app } from './modules';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <app.App />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
