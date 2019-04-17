import React from 'react';
import { Text, View, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import EditScreen from '../screens/EditScreen';
import RegistScreen from '../screens/RegistScreen';
import FriendListScreen from '../screens/FriendListScreen'
import ProfileScreen from '../screens/ProfileScreen/index';
import FlatListDemo from '../screens/ProfileScreen/FollowerScreen/FlatListDemo'
import EditInfo from '../screens/EditInfoScreen/index';
import AddPostScreen from '../screens/AddPostScreen';

import VectorIcon from '../Navigation/VectorIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
// https://oblador.github.io/react-native-vector-icons/

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Profile: ProfileScreen,
  Friend: FriendListScreen,
  EditProfile: EditScreen,
  AddPost: AddPostScreen,
});

// Home Screen
const HomeStack = createStackNavigator(
  {
  Home: HomeScreen,
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
  tabBarLabel: 'User',
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
const PostStack = createStackNavigator({
  Profile: ProfileScreen,
});

PostStack.navigationOptions = {
  tabBarLabel: 'Posts',
  tabBarIcon: ({ focused }) => (
    <VectorIcon
      focused={focused}
      //name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
      name={'photo'}
    />
  ),
};

// add new post
const AddPostStack = createStackNavigator({
  AddPost: AddPostScreen,
});

AddPostStack.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: ({ focused }) => (
    <VectorIcon
      focused={focused}
      //name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
      name={'instagram'}
    />
  ),

};


// buttom tabs
export default createAppContainer(createBottomTabNavigator(
  {
    HomeStack,
    FriendStack,
    AddPostStack,
    PostStack,
    UserInfoStack,
  }
  ));

