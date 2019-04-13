
import React from 'react';
import { Platform, TouchableOpacity, Text, Alert, TextInput, View } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import styles from '../constants/styles';
// import console = require('console');

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    // herder: null
    title: 'Login'
  }

  state = {
    phone: '',
    pass: ''
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  getRealPassword = () => {
    User.phone = this.state.phone;
    User.pass = this.state.pass;
    // to app
    ToApp = this.props.navigation.navigate('App');
    
    return firebase.database().ref('/users/' + User.phone).once('value').then(function (snapshot) {
      var password = (snapshot.val() && snapshot.val().pass) || 'Anonymous';
      if (User.phone.length < 10) {
        Alert.alert('Error', 'Wrong phone number')
      } else if (User.pass != password) {
        Alert.alert('Error', 'Wrong password')
      } else {
        // to app
        ToApp;
      }
  
    });
  }

  submitForm = () => {
    // console.log(this.password);
    // console.log(password);
    // console.log(User.phone);
    this.getRealPassword();
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong phone number')
    } else if (this.state.pass != User.pass) {
      // console.log(User.pass);
      Alert.alert('Error', 'Wrong password')
    } else {
      //save user data
      // await AsyncStorage.setItem('userPhone', this.state.phone);
      //   AsyncStorage.setItem('userPhone', this.state.phone);
      // User.phone = this.state.phone;
      // firebase.database().ref('users/' + User.phone).set({ pass: this.state.pass });// save to  firebase
      // to app
      this.props.navigation.navigate('App');
    }


  }

  toRegistScreen() {
    this.props.navigation.navigate('Regist');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={this.state.pass}
          onChangeText={this.handleChange('pass')}
        />
        {/* login */}
        <TouchableOpacity onPress={this.getRealPassword}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
        {/* Regist */}
        <TouchableOpacity onPress={this.toRegistScreen.bind(this)}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}