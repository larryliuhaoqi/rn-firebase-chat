
import React from 'react';
import { Platform, TouchableOpacity, Text, Alert, TextInput, View, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import styles from '../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';



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

  submitForm = async () => {
    User.phone = this.state.phone;
    User.pass = this.state.pass;
    // to app
    ToApp = this.props.navigation;
    AsSet = await AsyncStorage;
    return firebase.database().ref('/users/' + User.phone).once('value').then(function (snapshot) {
      var password = (snapshot.val() && snapshot.val().pass) || 'Anonymous';
      if (User.phone.length < 8) {
        Alert.alert('Error', 'Wrong phone number');
      } else if (User.pass != password) {
        Alert.alert('Error', 'Wrong password');
      } else if (User.pass == password) {
        // online
        firebase.database().ref("users").child(User.phone).update({ connections: "online" });
        // to app
        AsSet.setItem('userPhone', User.phone);
        ToApp.navigate('App');
      }

    });
  }

  toRegistScreen() {
    this.props.navigation.navigate('Regist');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signupTextCont}>
          <Icon
            name={'instagram'}
            size={120}
            marginBottom={40}
            color={'#444444'}
          />
          <TextInput
            placeholder="Phone"
            style={styles.signupText}
            value={this.state.phone}
            onChangeText={this.handleChange('phone')}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.signupText}
            value={this.state.pass}
            onChangeText={this.handleChange('pass')}
          />
          {/* login */}
          <TouchableOpacity
            onPress={this.submitForm}
            style={{
              marginTop: 80
            }}
          >
            <Text style={styles.btnText}>Enter</Text>
          </TouchableOpacity>
          {/* Regist */}
          <TouchableOpacity
            onPress={this.toRegistScreen.bind(this)}
            style={{
              marginTop: 10
            }}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}