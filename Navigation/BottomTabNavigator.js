import React from 'react';
import { Text, View, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import VectorIcon from '../Navigation/VectorIcon';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import EditScreen from '../screens/EditScreen';
import RegistScreen from '../screens/RegistScreen';
import FriendListScreen from '../screens/FriendListScreen'
import ProfileScreen from '../screens/ProfileScreen/index';
import FlatListDemo from '../screens/ProfileScreen/FollowerScreen/FlatListDemo'
import EditInfo from '../screens/EditInfoScreen/index'

import Ionicons from 'react-native-vector-icons/Ionicons';
// https://oblador.github.io/react-native-vector-icons/

const AppStack = createStackNavigator({
  Home: FriendListScreen,
  Chat: ChatScreen,
  Profile: ProfileScreen,
  Friend: FriendListScreen,
  EditProfile: EditScreen,
});

// Home Screen
const HomeStack = createStackNavigator(
  {
    Home: FriendListScreen
  },
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <VectorIcon
      focused={focused}
      name={'home'}
    />
  ),
  style: {
    backgroundColor: 'blue',
  },
};


// Profile Screen
const UserInfoStack = createStackNavigator({
  // UserInfoStack: { screen: ProfileScreen },
  // Follower: { screen: FlatListDemo },
  // Following: { screen: FlatListDemo },
  EditInfo: { screen: EditInfo },
});

UserInfoStack.navigationOptions = {
  tabBarLabel: 'UserInfo',
  tabBarIcon: ({ focused }) => (
    <VectorIcon
      focused={focused}
      //name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
      name={'user'}
    />
  ),
};

// Friend List Screen
const FriendStack = createStackNavigator({
  Friend: FriendListScreen,
});

FriendStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <VectorIcon
      focused={focused}
      //name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
      name={'address-book'}
    />
  ),
};

// Edit User Info Screen
const EditStack = createStackNavigator({
  EditInfo: EditScreen,
});

EditStack.navigationOptions = {
  tabBarLabel: 'Edit',
  tabBarIcon: ({ focused }) => (
    <VectorIcon
      focused={focused}
      //name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
      name={'bars'}
    />
  ),
};


// buttom tabs
export default createAppContainer(createBottomTabNavigator(
  {
    HomeStack,
    UserInfoStack,
    FriendStack,
    EditStack,
  }
));

