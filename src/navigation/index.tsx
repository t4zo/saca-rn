import React from 'react';
import _ from 'lodash';

import {Provider} from 'react-redux';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import codePush from "react-native-code-push";

import store from 'store/store';

import Home from 'screens/Home';
import AddCard from 'screens/AddCard';
import Camera from 'screens/Camera';

import Entrar from 'screens/SignIn';
import Registrar from 'screens/SignUp';

import colors from 'styles/colors';

const HomeStack = createStackNavigator({
  Home: {screen: Home, navigationOptions: {header: null}},
  AddCard: {screen: AddCard, navigationOptions: {header: null}},
  Camera: {screen: Camera, navigationOptions: {header: null}}
});

const AppContainer = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Imagens: {screen: HomeStack},
      Entrar: {screen: Entrar},
      Registrar: {screen: Registrar},
    },
    {
      tabBarPosition: 'top',
      tabBarOptions: {
        activeTintColor: colors.white,
        inactiveTintColor: colors.white,
        style: {
          backgroundColor: colors.primary,
        },
        indicatorStyle: {
          borderBottomColor: colors.white,
          borderBottomWidth: 3,
        },
      },
    },
  )
);

function Navigation() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START, 
}

export default codePush(codePushOptions)(Navigation);
