import React from 'react';
import { Text, View, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegistScreen from '../screens/RegistScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

const AppStack = createStackNavigator({
  Home: HomeScreen, Chat: ChatScreen, Profile: ProfileScreen, 
});

const AuthStack = createStackNavigator({ Login: LoginScreen, Regist: RegistScreen });

// buttom tabs
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
});
export default createAppContainer(TabNavigator);

