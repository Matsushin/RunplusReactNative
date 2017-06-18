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

    this.state = {
      items: [],
      isLoading: false,
    };
  }

  startRun() {
    Actions.running();
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <Container style={{ marginTop: 70 }}>
        <Content>
          <Button rounded onPress={() => this.startRun()}><Text>Start</Text></Button>
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
