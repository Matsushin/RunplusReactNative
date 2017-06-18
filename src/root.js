import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store';
import Router from './router';
import SignupModal from './components/SignupModal';

class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
    this.store = configureStore(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      //return null;
    }
    return (
      <Provider store={this.store}>
        <View style={{ flex: 1 }}>
          <Router />
          <SignupModal />
        </View>
      </Provider>
    );
  }
}

module.exports = Root;
