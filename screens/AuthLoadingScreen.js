import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase'; // firebase
import User from '../User';
import config from '../static/config'


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    firebase.initializeApp(config.firebase);

    if (User.phone) {
      var presenceRef = firebase.database().ref("users").child(User.phone).child('connections')
      // Write a string when this client loses connection
      presenceRef.onDisconnect().set("offline");
    }

    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
      if (snap.val() === true) {
        alert("connected");
      } else {
        alert("not connected");
      }
    });
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}