import React from 'react';
import { SafeAreaView, Image, View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import User from '../User';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class HomeScreen extends React.Component {
    // header
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                // <TouchableOpacity onPress={this.forceUpdateHandler}>
                //     <Text>Chats</Text>
                // </TouchableOpacity>
                <Button onPress={this.forceUpdateHandler} title="Learn More" ></Button>
                ),
            headerRight: (

                // <Button onPress={this.refreshScreen} title="Refresh Screen" />

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../images/user.png')}
                        style={{ width: 32, height: 32, marginRight: 7 }}
                    />
                </TouchableOpacity>
            ),

        }

    }

    state = {
        users: []
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         lastRefresh: Date(Date.now()).toString(),
    //     }
    //     this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
    // }

    constructor(){
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      };

    forceUpdateHandler() {
        // this.setState({ lastRefresh: Date(Date.now()).toString() })
        this.forceUpdate(callback);
    }


    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            // hidden 'myself'
            if (person.phone === User.phone) {
                User.name = person.name
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })

    }

    // convert time
    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result == d.getDay() + '' + d.getMonth() + '' + result;
        }
        return result;
    }


    presenceSystem() {
        // online
        firebase.database().ref("users").child(User.phone).update({ connections: "online" });

        // offline
        var presenceRef = firebase.database().ref("users").child(User.phone);
        // Write a string when this client loses connection
        presenceRef.onDisconnect().update({ connections: "offline", lastOnline: firebase.database.ServerValue.TIMESTAMP });
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat', item)}
                style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 20 }}>
                    {item.name}--{item.connections}--{this.convertTime(item.lastOnline)}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        this.presenceSystem.bind(this);
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </SafeAreaView>
        )
    }
}