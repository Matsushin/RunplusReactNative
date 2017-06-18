import React, {
  Component,
} from 'react';
import {
  View,
} from 'react-native';
import { Spinner } from 'native-base';
import colors from '../colors';

export default class Loading extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.paleGrey, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner color='blue' />
      </View>
    );
  }
}
