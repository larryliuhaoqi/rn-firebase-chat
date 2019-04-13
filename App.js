import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistScreen from './screens/RegistScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen, Chat: ChatScreen, Profile: ProfileScreen, 
});
const AuthStack = createStackNavigator({ Login: LoginScreen, Regist: RegistScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    // initialRouteName: 'Auth',
    initialRouteName: 'AuthLoading',
  }
));