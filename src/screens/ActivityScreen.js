import React, {
  Component,
} from 'react';
import { View } from 'react-native';
import { Text, Container, Content, Grid, Col, List, ListItem, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import Loading from '../components/Loading';
import ApiClient from '../ApiClient';

class ActivityScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      totalDistance: 0,
      totalRunCount: 0,
      averageLapTime: '0`00',
      isLoading: true,
    };
  }

  componentWillMount() {
    if (this.props.user) {
      this.fetchData().done();
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  onPressEvent(item) {
    Actions.activityDetail({ eventId: item.id, title: moment(item.recorded_at).format('YYYY/MM/DD')});
  }

  fetchData() {
    return new ApiClient(this.props.user).request('/events.json')
    .then((responseJson) => {
      if (responseJson.events) {
        this.setState({
          isLoading: false,
          totalDistance: responseJson.total_distance,
          totalRunCount: responseJson.total_run_count,
          averageLapTime: responseJson.average_lap_time,
          items: responseJson.events,
        });
      } else if (responseJson.error) {
        this.setState({
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: false,
        })
      }
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <Container style={{ marginTop: 70 }}>
        <Content>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', marginTop: 20 }}>{this.state.totalDistance}</Text>
            <Text note style={{ textAlign: 'center', marginTop: 10, marginBottom: 20 }}>合計Km</Text>
            <Grid>
              <Col>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{this.state.totalRunCount}</Text>
                <Text note style={{ textAlign: 'center', marginTop: 5 }}>合計ラン数</Text>
              </Col>
              <Col>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{this.state.averageLapTime}</Text>
                <Text note style={{ textAlign: 'center', marginTop: 5 }}>平均ペース</Text>
              </Col>
            </Grid>
          </View>
          <List
            dataArray={this.state.items}
            renderRow={item =>
              <ListItem button onPress={() => this.onPressEvent(item)} iconRight>
                <View style={{ flex:  1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text note style={{ marginBottom: 5 }}>{item.recorded_at}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginBottom: 5 }}>{item.name}</Text>
                  </View>
                  <Grid>
                    <Col><Text note style={{ marginRight: 'auto' }}>{item.distance}km</Text></Col>
                    <Col><Text note style={{ marginRight: 'auto' }}>{item.lap_time}/km</Text></Col>
                    <Col><Text note style={{ marginRight: 'auto' }}>{item.record_time}</Text></Col>
                  </Grid>
                </View>
                <Icon name='ios-arrow-forward' style={{color: '#CCCCCC'}} />
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

ActivityScreen.propTypes = {
  user: React.PropTypes.object,
};

function select(store) {
  return {
    user: store.currentUser.user,
  };
}


module.exports = connect(select)(ActivityScreen);
