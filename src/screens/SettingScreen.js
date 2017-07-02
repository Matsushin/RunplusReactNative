import React, {
  Component,
} from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Text, Container, Content, List, ListItem, Body, Right, Icon, Separator } from 'native-base';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import ApiClient from '../ApiClient';
import Loading from '../components/Loading';
import { resetCurrentUser } from '../actions/currentUser';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    Alert.alert(
      '',
      'ログアウトしてよろしいですか？',
      [
        { text: 'キャンセル' },
        { text: 'ログアウト', onPress: () => {
          this.props.onSignOut();
          Actions.runEventTop({type: ActionConst.REFRESH});
        }},
      ],
    );
  }

  render() {
    if (!this.props.user) {
      return <Loading />;
    }
    return (
      <Container style={{ marginTop: 70 }}>
        <Content>
          <List>
            <ListItem>
              <Text>{this.props.user.name}</Text>
            </ListItem>
            <ListItem>
              <Text>{this.props.user.email}</Text>
            </ListItem>
            <Separator bordered>
            </Separator>
            <ListItem icon>
              <Body>
                <TouchableOpacity onPress={this.signOut.bind(this)} >
                  <Text>ログアウト</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

SettingScreen.propTypes = {
  user: React.PropTypes.object,
  signupModalOn: React.PropTypes.func.isRequired,
  onSignOut: React.PropTypes.func.isRequired,
};

function select(store) {
  return {
    user: store.currentUser.user,
  };
}

function actions(dispatch) {
  return {
    signupModalOn: () => {
      dispath(signupModalOn());
    },
    onSignOut: () => {
      dispatch(resetCurrentUser());
    },
  };
}

module.exports = connect(select, actions)(SettingScreen);
