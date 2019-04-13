
import React from 'react';
import { Platform, TouchableOpacity, AsyncStorage, Text, Alert, TextInput, View } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import styles from '../constants/styles';

export default class RegistScreen extends React.Component {

  static navigationOptions = {
    title: 'Registration'
  }

  state = {
    phone: '',
    pass: '',
    name: '',
    email: ''
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  submitForm = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong phone number')
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Invalid name')
    } else if (this.state.pass.length < 3) {
      Alert.alert('Error', 'Wrong password')
    } else if (this.state.email.length < 5) {
      Alert.alert('Error', 'Invalid Email address')
    } else {
      //save user data
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({ 
        name: this.state.name, 
        pass: this.state.pass, 
        email:this.state.email 
      });// save to  firebase
      // this.props.navigation.navigate('App');
      Alert.alert('Congratulations!', 'Sign up successfully!')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={this.state.pass}
          onChangeText={this.handleChange('pass')}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          value={this.state.email}
          onChangeText={this.handleChange('email')}
        />
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}