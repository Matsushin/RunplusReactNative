import React, {
  Component,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Container, Content, Grid, Col } from 'native-base';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import ApiClient from '../ApiClient';
import MapView from 'react-native-maps';

class ActivityDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    this.fetchData().done();
  }

  fetchData() {
    return new ApiClient(this.props.user).request('/events/' + this.props.eventId + '.json')
    .then((responseJson) => {
      console.log(responseJson)
      if (responseJson.event) {
        this.setState({
          isLoading: false,
          item: responseJson.event,
        });
      } else if (responseJson.error) {
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  render() {
    const item = this.state.item;
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <Container style={{ marginTop: 70 }}>
        <Content>
          <View style={styles.container}>
            <MapView
              style={{width: '100%', height: 250}}
              initialRegion={item.region}
            >
            <MapView.Polyline
             coordinates={item.locations}
             strokeColor='#FF8A8F'
             strokeWidth={5}
           />
              {item.markers.map(marker =>
                <MapView.Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                >
                  <View style={styles.container2}>
                    <View style={styles.bubble}>
                      <Text style={styles.amount}>{marker.km}</Text>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </MapView.Marker>
              )}
            </MapView>
          </View>
          <Grid>
            <Col>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{item.distance}km</Text>
              <Text note style={{ textAlign: 'center', marginTop: 5 }}>距離</Text>
            </Col>
            <Col>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{item.lap_time}</Text>
              <Text note style={{ textAlign: 'center', marginTop: 5 }}>平均ペース</Text>
            </Col>
            <Col>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{item.record_time}</Text>
              <Text note style={{ textAlign: 'center', marginTop: 5 }}>タイムを設定</Text>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container2: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    marginBottom: 22,
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FF5A5F',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#FF5A5F',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

ActivityDetailScreen.propTypes = {
  user: React.PropTypes.object,
};

function select(store) {
  return {
    user: store.currentUser.user,
  };
}

module.exports = connect(select)(ActivityDetailScreen);
