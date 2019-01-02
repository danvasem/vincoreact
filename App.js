import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/app-navigator';
import reducer from './src/reducers/index';

const store = createStore(reducer);

export default class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <AppNavigator />
          </Provider>
    );
  }
}