import React, {
  Component,
} from 'react';
import {
  View
} from 'react-native';
import { Text, Container, Content, Button } from 'native-base';

export default class CountdownView extends Component {
  render() {
    return (
      <Container style={{ marginTop: 60 }}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 200, color: 'white', padding: 20 }}>
            {this.props.countDownNumber}
          </Text>
        </View>
      </Container>
    );
  }
}
