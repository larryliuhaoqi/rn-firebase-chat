
import React from 'react';
import {
  Platform,
  TouchableOpacity,
  // AsyncStorage, 
  Text,
  Alert,
  TextInput,
  View
} from 'react-native';
import firebase from 'firebase';
import User from '../User';
import styles from '../constants/styles';
import VectorIcon from '../Navigation/VectorIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RegistScreen extends React.Component {

  static navigationOptions = {
    title: 'Registration'
  }

  state = {
    phone: '',
    pass: '',
    name: '',
    email: '',
    connections: 'offline',
    lastOnline: ''
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  submitReForm = () => {
    if (this.state.phone.length < 8) {
      Alert.alert('Error', 'Wrong phone number')
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Invalid name')
    } else if (this.state.pass.length < 3) {
      Alert.alert('Error', 'Wrong password')
    } else if (this.state.email.length < 5) {
      Alert.alert('Error', 'Invalid Email address')
    } else {
      //save user data
      // await AsyncStorage.setItem('userPhone', this.state.phone);
      // await AsyncStorage.setItem('userPhone', null);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({
        name: this.state.name,
        pass: this.state.pass,
        email: this.state.email,
        connections: this.state.connections,
        lastOnline: this.state.lastOnline
      });// save to  firebase
      Alert.alert('Congratulations!', 'Sign up successfully!')
    }
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
            style={styles.signupText}
            value={this.state.pass}
            onChangeText={this.handleChange('pass')}
          />
          <TextInput
            placeholder="Username"
            style={styles.signupText}
            value={this.state.name}
            onChangeText={this.handleChange('name')}
          />
          <TextInput
            placeholder="Email Address"
            style={styles.signupText}
            value={this.state.email}
            onChangeText={this.handleChange('email')}
          />
          <TouchableOpacity 
          onPress={this.submitReForm}
          style={{
            marginTop:40
          }}
          >
            <Text style={styles.signupButton}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}