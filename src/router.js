import React, { Component } from 'react';
import { Scene, Router, Actions, View, Text } from 'react-native-router-flux';
import { StyleProvider, variables, Drawer } from 'native-base';
import { connect, Provider } from 'react-redux';
import TabIcon from './components/TabIcon';
import colors from './colors';
const RouterWithRedux = connect()(Router);

import ActivityScreen from './screens/ActivityScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen';
import RunEventTopScreen from './screens/RunEventTopScreen';
import RunningScreen from './screens/RunningScreen';
import SettingScreen from './screens/SettingScreen';

class NavigationRouter extends Component {

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root"
          tabs
          tabBarStyle={{ height: 48, backgroundColor: colors.navBackground, shadowColor: colors.silver, shadowOffset: { height: -1, width: 1 }, shadowOpacity: 0.5, shadowRadius: 1 }}
          tabBarIconContainerStyle={{ height: 48 }}
          >
          <Scene key="activityTab" icon={TabIcon}>
            <Scene key="activity" component={ActivityScreen} title="アクティビティ" />
            <Scene key="activityDetail" component={ActivityDetailScreen} />
          </Scene>
          <Scene key="runEventTop" initial component={RunEventTopScreen} title="Run+" icon={TabIcon}  />
          <Scene key="setting" component={SettingScreen} title="設定" icon={TabIcon}/>
        </Scene>
        <Scene key="running" component={RunningScreen} title="Run+" />
      </RouterWithRedux>
    );
  }
}

module.exports = NavigationRouter;
