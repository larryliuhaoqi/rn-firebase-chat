// https://firebase.googleblog.com/2013/06/how-to-build-presence-system.html
import React, { Component } from 'react';
import { SafeAreaView, Image, View, Text, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import User from '../User';
import firebase from 'firebase';
// import { YellowBox } from 'react-native';
import _ from 'lodash';
import { List, ListItem, SearchBar } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import VectorIcon from '../Navigation/VectorIcon';
import styles from '../constants/styles'


// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//     if (message.indexOf('Setting a timer') <= -1) {
//         _console.warn(message);
//     }
// };

export default class FriendListScreen extends React.Component {
    static navigationOptions = {
        header: null,
        // title: 'Home',
    };
    // header
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: null,
    //         headerTitle: (
    //                 <Text>Chats</Text>
    //         ),
    //         headerRight: (
    //             <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
    //                 <Image source={require('../images/user.png')}
    //                     style={{ width: 32, height: 32, marginRight: 7 }}
    //                 />
    //             </TouchableOpacity>
    //         ),
    //     }
    // }


    constructor(props) {
        super(props);
        this.state = {
            connections: '',
            users: [],
            loading: false,
            data: [],
            error: null,
            refreshing: false
        };
    }

    makeRemoteRequest = () => {
        let dbRef = firebase.database().ref('users');
        this.setState({
            loading: true,
        });

        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            // hidden 'myself'
            if (person.phone === User.phone) {
                User.name = person.name
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person],
                        loading: false,
                        refreshing: false
                    }
                })
            }
        })
    };

    componentDidMount() {
        this.makeRemoteRequest();
    }

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true,
                users: [],
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            () => {
                this.makeRemoteRequest();
            }
        );
    };


    // convert time
    convertTime = (conn,time) => {
        // console.log(time);
        
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        // result = d.getDay() + ' day ' + d.getMonth() + ' month before at' + result;
        var c_year = c.getFullYear();
        var c_month = c.getMonth() +1;
        var c_date = c.getDate();
        var c_ymd = c_year*10000+c_month*100+c_date;
        // console.log(c_ymd);

        var d_year = d.getFullYear();
        var d_month = d.getMonth() +1;
        var d_date = d.getDate();
        var d_ymd = d_year*10000+d_month*100+d_date;

        if (conn == 'online'){
            result = ' ';
        }else if (c_ymd-d_ymd >= 10000) {
            result = '  -  Last online ' + d_year + '/' + d_month + '/'+d_date+' ' + result;
        }else if(c_ymd-d_ymd < 10000 && c_ymd-d_ymd >= 1 ) {
            result = '  -  Last online ' + d_month + '/'+d_date+' ' + result;
        }

        return result;
    }

    // precense system
    presenceSystem() {
        // online
        firebase.database().ref("users").child(User.phone).update({ connections: "online" });

        // offline
        var presenceRef = firebase.database().ref("users").child(User.phone);
        // Write a string when this client loses connection
        presenceRef.onDisconnect().update({ connections: "offline", lastOnline: firebase.database.ServerValue.TIMESTAMP });
    }

    // blue name and 'online' if online
    handleColor = (conn) => {
        let ccc = new String(conn);
        let online = 'online';
        let online_blue = '#2976c4';
        let offline_grey = '#ccc';
        if (ccc == online) {
            return online_blue;
        }else{
            return offline_grey;
        }
    }

    renderRow = ({ item }) => {
        return (
            // display each user
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat', item)}
                style={{
                    marginLeft: "1%"
                }}
            >
                <ListItem
                    roundAvatar
                    title={
                        <Text
                        style={{ 
                            paddingLeft: 25,
                            fontWeight:'bold',
                            fontSize:18,
                            color: this.handleColor(item.connections),
                        }}
                    >
                    {item.name}
                    </Text>

                    }
                    subtitle={
                        <Text
                            style={{ 
                                paddingLeft: 25,
                                color: this.handleColor(item.connections),
                            }}
                        >
                        {item.connections}{this.convertTime(item.connections,item.lastOnline)}
                        </Text>
                    }
                    avatar={
                        // uri: item.picture.thumbnail
                        // { uri: this.state.data.picture.thumbnail }
                        // require('../images/user.png')
                        <VectorIcon
                            name='user'
                        />
                    }
                    containerStyle={{ borderBottomWidth: 0 }}
                />
            </TouchableOpacity>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "12%"
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };


    render() {
        this.presenceSystem.bind(this);
        return (
            <SafeAreaView>
                {/* make all user to list */}
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}

                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}

                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

                />
            </SafeAreaView>
        )
    }
}