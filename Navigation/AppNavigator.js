import React from 'react';
import { Text, View, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegistScreen from '../screens/RegistScreen';
import BottomTab from './BottomTabNavigator'

const AppStack = createStackNavigator({
  // go to ./BottomTabNavigator and pass data to the following pages
  Bottom:BottomTab, Home: HomeScreen, Chat: ChatScreen, Profile: ProfileScreen, 
});

const AuthStack = createStackNavigator({ Login: LoginScreen, Regist: RegistScreen });

// the main flow of login system
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
