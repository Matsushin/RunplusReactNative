import React, {
  Component,
} from 'react';
import { DeviceEventEmitter, AppState, View } from 'react-native';
import { Text, Container, Content, Button } from 'native-base';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import ApiClient from '../ApiClient';
import CountDownView from '../components/CountDownView';
import moment from 'moment';

const { RNLocation: Location } = require('NativeModules');
const intervalDuration = 50;
const intervalLapDuration = 100;

class RunningScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        appState: AppState.currentState,
        currentTime: 0,
        isRun: true,
        locationSet: false,
        locations: [],
        location: {
          coords: {
            course: 358.28, // 方角
            speed: 0, // 速度 m/s
            longitude: -122.02322184, // 緯度
            latitude: 37.33743371, // 経度
            accuracy: 5, // 正確性
            altitude: 0, // 高度
            altitudeAccuracy: -1,
          },
          timestamp: 0,
        },
        lapTime: 0,
        seconds: 0,
        distance: 0,
        timer: undefined,
        recordedAt: null,
        countDownNumber: 5,
        countDown: true,
      };
  }

  componentDidMount() {
    AppState.addListener('appStateDidChange', this.handleAppStateChange);
    this.countDown();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.setState({ timer: undefined });
    // 前の画面に戻った後再度開始するとエラーとなるため一旦コメントアウト
    //AppState.removeEventListener('appStateDidChange', this.handleAppStateChange);
  }

  countDown() {
    countDownTimer = setInterval(() => {
      this.setState({ countDownNumber: this.state.countDownNumber - 1 });
      if (this.state.countDownNumber < 1) {
        clearInterval(countDownTimer);
        this.setState({countDown: false});
        this.startRun();
      }
    }, 1000);
  }

  handleAppStateChange = (nextAppState) => {
    appState = nextAppState.app_state;
    if (this.state.appState.match(/inactive|background/) && appState == 'active') {
      if (this.state.isRun) {
        const backgroundTime = Math.floor((Date.now() - this.state.currentTime) / 1000);
        this.setState({ seconds: this.state.seconds + backgroundTime });
      }
    }

    if (this.state.appState.match(/inactive|active/) && appState == 'background') {
      if (this.state.isRun) {
        this.setState({ currentTime: Date.now() });
      }
    }

    this.setState({ appState });
  }

  startRun() {
    Location.requestAlwaysAuthorization();
    Location.startUpdatingLocation();
    Location.setDistanceFilter(intervalDuration); // 指定のメートル毎に位置情報を取得する
    if (!this.state.locationSet) {
      DeviceEventEmitter.addListener('locationUpdated', (location) => {
        const locations = this.state.locations;
        const param = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          altitude: location.coords.altitude,
          elapsed_time: this.state.seconds,
          distance: this.state.distance + intervalDuration,
          measured_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        const prevLocation = locations[locations.length - (intervalLapDuration / intervalDuration)];
        const prevElapsedTime = prevLocation ? prevLocation.elapsed_time : 0
        locations.push(param);
        const lapTime = prevLocation ? (param.elapsed_time - prevElapsedTime) * 1000 / intervalLapDuration : 0 ;
        this.setState({ location: location, locations: locations, distance: this.state.distance + intervalDuration, lapTime: lapTime });
      });
    }
    const timer = setInterval(() => { this.tick(this) }, 1000);
    this.setState({ isRun: true, locationSet: true, timer: timer, recordedAt: moment().format("YYYY-MM-DD HH:mm:ss") });
  }

  tick(component) {
    component.setState({ seconds: component.state.seconds + 1 });
  }

  sToMs(t) {
    const m = t % 3600 / 60 | 0;
    const s = t % 60;
    if (t == 0) {
      ms = '-'
    } else if (m != 0) {
      ms = m + "分" + s + "秒";
    } else {
      ms = s + "秒";
    }
    return ms
  }

  stopRun() {
    this.setState({ isRun: false });
    Location.stopUpdatingLocation();
    clearInterval(this.state.timer);
  }

  endRun() {
    if (this.state.locations.length == 0) {
     return Actions.pop();
    }
    // 保管後に詳細画面に移動してトースターを表示する
    const distance = this.state.locations.length * intervalDuration;
    const lapTime = this.state.seconds / (distance / 1000);
    new ApiClient(this.props.user)
      .request('/events.json', {
        method: 'POST',
        body: JSON.stringify({
          event: {
            distance: distance,
            lap_time: lapTime,
            record_time: this.state.seconds,
            locations_attributes: this.state.locations,
            recorded_at: this.state.recordedAt,
          }
        }),
      })
      .then((responseJson) => {
        console.log(responseJson);
        item = responseJson.event;
        Actions.activityDetail({ eventId: item.id, title: moment(item.recorded_at).format('YYYY/MM/DD')});
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    let button;
    if (this.state.countDown) {
      return <CountDownView countDownNumber={this.state.countDownNumber}/>
    }
    if (this.state.isRun) {
      button = (
        <Button onPress={() => this.stopRun()}><Text>Stop</Text></Button>
      );
    } else {
      button = (
        <Button onPress={() => this.startRun()}><Text>Start</Text></Button>
      );
    }
    return (
      <Container style={{ marginTop: 70 }}>
        <Content>
          { button }
          <Button onPress={() => this.endRun()}><Text>End</Text></Button>
          <Text>経過時間：{this.state.seconds}秒</Text>
          <Text>ペース：{this.sToMs(this.state.lapTime)}/km</Text>
          <Text>距離：{this.state.distance}m</Text>
        </Content>
      </Container>
    );
  }
}

RunningScreen.propTypes = {
  user: React.PropTypes.object,
};

function select(store) {
  return {
    user: store.currentUser.user,
  };
}

module.exports = connect(select)(RunningScreen);
