import React from 'react';
import { Text, View, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegistScreen from '../screens/RegistScreen';
import FriendListScreen from '../screens/FriendListScreen/FriendListScreen'

import Ionicons from 'react-native-vector-icons/Ionicons';

const AppStack = createStackNavigator({
  Home: HomeScreen, 
  Chat: ChatScreen, 
  Profile: ProfileScreen, 
  Friend: FriendListScreen,
});

const AuthStack = createStackNavigator({ Login: LoginScreen, Regist: RegistScreen });

// buttom tabs
const TabNavigator = createBottomTabNavigator({
  H: HomeScreen,
  P: ProfileScreen,
  F: FriendListScreen,
});
export default createAppContainer(TabNavigator);

