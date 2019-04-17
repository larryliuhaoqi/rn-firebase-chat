import React, { Component } from 'react';
import { SafeAreaView, Image, View, Text, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';

import { List, ListItem, SearchBar } from "react-native-elements";
import styles from '../constants/styles';
import User from '../User';

import config from '../static/config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        // title: 'Home',
    };


    constructor(props) {
        super(props);
        this.state = {
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
    convertTime = (conn, time) => {
        // console.log(time);

        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        // result = d.getDay() + ' day ' + d.getMonth() + ' month before at' + result;
        var c_year = c.getFullYear();
        var c_month = c.getMonth() + 1;
        var c_date = c.getDate();
        var c_ymd = c_year * 10000 + c_month * 100 + c_date;
        // console.log(c_ymd);

        var d_year = d.getFullYear();
        var d_month = d.getMonth() + 1;
        var d_date = d.getDate();
        var d_ymd = d_year * 10000 + d_month * 100 + d_date;

        if (conn == 'online') {
            result = ' ';
        } else if (c_ymd - d_ymd >= 10000) {
            result = '  -  Last online ' + d_year + '/' + d_month + '/' + d_date + ' ' + result;
        } else if (c_ymd - d_ymd < 10000 && c_ymd - d_ymd >= 1) {
            result = '  -  Last online ' + d_month + '/' + d_date + ' ' + result;
        }

        return result;
    }

    renderRow = ({ item }) => {
        return (
            // display each user
            <View
                style={{
                    marginBottom: 15
                }}>
                <ListItem
                    title={
                        <Text
                            style={{
                                paddingLeft: 25,
                                marginBottom: 3,
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: '#444444',
                            }}
                        >
                            {item.name}
                        </Text>

                    }
                    subtitle={
                        <Text
                            style={{
                                paddingLeft: 25,
                                color: 'grey',
                            }}
                        >
                            Location
                        </Text>
                    }
                    avatar={
                        <TouchableOpacity
                            // onPress={() => this.props.navigation.navigate('Chat', item)}
                            style={{
                                marginLeft: "1%",
                                marginTop: 5
                            }}
                        >
                            <Image
                                // style={styles.userImage}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 30
                                }}
                                source={{
                                    uri: config.nodeServer +
                                        'imageDownload?img=' +
                                        // User.phone + 
                                        '1111111111_icon.jpg'
                                }}
                            />

                        </TouchableOpacity>

                    }
                    containerStyle={{ borderBottomWidth: 0 }}
                />

                <TouchableOpacity
                    style={{
                        marginTop: 10,
                    }}>
                    <Image
                        style={{ width: '100%', height: 250}}
                        source={{
                            uri: config.nodeServer +
                                'imageDownload?img=' +
                                // User.phone + 
                                '1111111111_icon.jpg'
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 15,
                        marginBottom: 25,
                        marginLeft: 10,
                        marginRight: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                        }}>Description of this post</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    // renderHeader = () => {
    //     return <SearchBar placeholder="Type Here..." lightTheme round />;
    // };

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
        return (
            <SafeAreaView>
                {/* make all user to list */}
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}

                    ItemSeparatorComponent={this.renderSeparator}
                    // ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}

                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

                />
            </SafeAreaView>
        )
    }
}