import React from 'react';
import { SafeAreaView, Text, TextInput, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name
    }

    // handel change name
    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    //change name
    changeName = async () => {
        if (this.state.name.length < 3) {
            Alert.alert('Error', 'Please enter valid name.')
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).set({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('Success', 'Name have be changed.');
        }
    }

    //log out
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 20 }}>
                    {User.phone}
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Change name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._logOut}>
                    <Text style={styles.btnText}>LOGOUT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}