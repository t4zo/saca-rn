import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import _ from 'lodash';

import { useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import codePush from "react-native-code-push";

import Home from 'screens/Home';
import AddCard from 'screens/AddCard';
import Camera from 'screens/Camera';

import Entrar from 'screens/SignIn';
import Registrar from 'screens/SignUp';

import Colors from 'utils/Colors';
import Reducers from 'models/Reducers';
import User from 'models/User';
import Consts from 'utils/Consts';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={Consts.screens.Home} screenOptions={{ gestureEnabled: true, headerShown: false }}>
      <Stack.Screen name={Consts.screens.Home} component={Home} />
      <Stack.Screen name={Consts.screens.AddCard} component={AddCard} />
      <Stack.Screen name={Consts.screens.Camera} component={Camera} />
    </Stack.Navigator>
  )
}

function Navigation() {
  const user = useSelector<Reducers, User>(state => state.user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={Consts.screens.Imagens}
        screenOptions={{ tabBarColor: Colors.primary }}
      >
        <Tab.Screen
          name={Consts.screens.Imagens}
          component={HomeStack}
          options={{ 
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={18}/>
            ), 
            tabBarLabel: Consts.screens.Imagens 
          }}
        />
        <Tab.Screen
          name={_.isEmpty(user) ? Consts.screens.Entrar : Consts.screens.Sair }
          component={Entrar}
          initialParams={{ user: 'me' }}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name={_.isEmpty(user) ? "check" : "close"} color={color} size={18}/>
            ), 
            tabBarLabel: _.isEmpty(user) ? Consts.screens.Entrar : Consts.screens.Sair
          }}
        />
        {_.isEmpty(user) && (
        <Tab.Screen
          name={Consts.screens.Registrar}
          component={Registrar}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="plus" color={color} size={18}/>
            ), 
            tabBarLabel: Consts.screens.Registrar
          }}
        />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START, 
}

export default codePush(codePushOptions)(Navigation);

// {
//   tabBarPosition: 'top',
//   tabBarOptions: {
//     activeTintColor: Colors.white,
//     inactiveTintColor: Colors.white,
//     style: {
//       backgroundColor: Colors.primary,
//     },
//     indicatorStyle: {
//       borderBottomColor: Colors.white,
//       borderBottomWidth: 3,
//     },
//   },
// },
