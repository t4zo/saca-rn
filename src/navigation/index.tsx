import React from 'react';
import _ from 'lodash';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import store from 'store/store';

import Home from 'screens/Home';
import Entrar from 'screens/SignIn';
import Registrar from 'screens/SignUp';
import colors from 'styles/colors';

const TabScreen = createMaterialTopTabNavigator(
  {
    Imagens: {screen: Home},
    Entrar: {screen: Entrar},
    Registrar: {screen: Registrar},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: colors.primary,
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
);

let App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      title: 'SACA',
    },
  },
});

let Navigation = createAppContainer(App);
export default function NavFunction() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
