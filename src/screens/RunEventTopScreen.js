import React, {
  Component,
} from 'react';
import { View } from 'react-native';
import { Text, Container, Content, Button } from 'native-base';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import moment from 'moment';
import Loading from '../components/Loading';
import ApiClient from '../ApiClient';

class RunEventTopScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ marginTop: 70, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Content>
          <Button rounded onPress={Actions.running}><Text>Start</Text></Button>
        </Content>
      </Container>
    );
  }
}

RunEventTopScreen.propTypes = {
  user: React.PropTypes.object,
};

function select(store) {
  return {
    user: store.currentUser.user,
  };
}


module.exports = connect(select)(RunEventTopScreen);
