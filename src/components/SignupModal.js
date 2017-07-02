import React, { Component } from 'react';
import { Modal, Text, Alert, View } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  List,
  ListItem,
  InputGroup,
  Input,
  Button,
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setCurrentUser } from '../actions/currentUser';
import FadeLoading from '../components/FadeLoading';
import ApiClient from '../ApiClient';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSending: false,
    };
  }

  get isLoginButtonTouchable() {
    return (
      (this.state.email && this.state.email.length > 0) &&
      (this.state.password && this.state.password.length > 0) &&
      !this.state.isSending
    );
  }

  handlePressLogin() {
    const { email, password, isSending } = this.state;
    if (isSending) {
      return;
    }
    this.setState({ isSending: true });
    new ApiClient().request('/users/sign_in', {
      fullPath: true,
      method: 'POST',
      body: JSON.stringify({ user: { email, password } }),
    })
    .then((response) => {
      if (response.user) {
        this.props.setCurrentUser(response.user);
      } else if (response.error) {
        Alert.alert(
          'エラー',
          'メールアドレスまたは、パスワードが正しくありません。\nもう一度入力してください',
          [
            { text: 'OK', onPress: () => {} },
          ],
        );
      }
      this.setState({ isSending: false });
    });
  }

  renderLoginButton() {
    return (
      <View>
        <Button
          onPress={() => this.handlePressLogin()}
          style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, paddingLeft: 30, paddingRight: 30 }}
          disabled={!this.isLoginButtonTouchable}
        >
          <Text>ログイン</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <Modal
        visible={this.props.user ? false : true}
      >
        <Container>
          <Content>
            <Card style={{ marginTop: 100, marginLeft: 20, marginRight: 20, paddingTop: 10 }}>
              <CardItem>
                <List style={{ width: 300 }}>
                  <ListItem style={{ marginBottom: 12 }}>
                    <InputGroup>
                      <Icon name="ios-person" />
                      <Input
                        ref={(c) => { this.email = c; }}
                        placeholder="メールアドレス"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={text => this.setState({ email: text })}
                        onSubmitEditing={() => this.password.textInput.focus()}
                      />
                    </InputGroup>
                  </ListItem>
                  <ListItem>
                    <InputGroup>
                      <Icon name="ios-unlock" />
                      <Input
                        ref={(c) => { this.password = c; }}
                        placeholder="パスワード"
                        value={password}
                        onChangeText={text => this.setState({ password: text })}
                        onSubmitEditing={() => this.handlePressLogin()}
                        secureTextEntry
                      />
                    </InputGroup>
                  </ListItem>
                </List>
              </CardItem>
              <CardItem>
                {this.renderLoginButton()}
              </CardItem>
            </Card>
            <FadeLoading show={this.state.isSending} />
          </Content>
        </Container>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  setCurrentUser: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
};

function select(store) {
  return {
    user: store.currentUser.user,
  };
}

function actions(dispath) {
  return {
    setCurrentUser: (user) => {
      dispath(setCurrentUser(user));
    },
  };
}

module.exports = connect(select, actions)(SignupModal);
