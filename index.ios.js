import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Root from './src/root';

export default class RunplusReactNative extends Component {
  render() {
    return (
      <Root />
    );
  }
}


AppRegistry.registerComponent('RunplusReactNative', () => RunplusReactNative);
