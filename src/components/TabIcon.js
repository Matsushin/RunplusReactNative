import React, {
  Component,
  PropTypes,
  Touch
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import colors from '../colors';

const icons = {
  activityTab: 'Activity',
  runEventTop: 'Run'
}

class TabIcon extends Component {

  render() {
    const { name, selected } = this.props;
    const title = icons[name];
    const color = selected ? colors.mainTextColor : colors.subTextColor;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 10, color }}>{ title }</Text>
      </View>
    )
  }
}


TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

module.exports = TabIcon;
