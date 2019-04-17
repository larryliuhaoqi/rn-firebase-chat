import React from 'react';
import { SafeAreaView, View, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../constants/styles';
import User from '../User';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';
import VectorIcon from '../Navigation/VectorIcon';
// import Ionicons from 'react-native-vector-icons/Ionicons';


export default class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >{navigation.getParam('name', null)}</Text>
            ),
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Friend')}
                    style={{ paddingLeft: 10, }}
                >
                    <VectorIcon
                        // name={'arrow-left'}
                        name={'angle-left'}

                    />
                </TouchableOpacity>
            ),
        }
    }


    state = {
        textMessage: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },
            textMessage: '',
            messageList: []
        }
    }

    //willmount messages to be displayed
    componentWillMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    // convert time
    convertTime = (time) => {
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

        if (c_ymd - d_ymd >= 10000) {
            result = d_year + '/' + d_month + '/' + d_date + ' ' + result;
        } else if (c_ymd - d_ymd < 10000 && c_ymd - d_ymd >= 1) {
            result = d_month + '/' + d_date + ' ' + result;
        }

        return result;
    }

    // send messages to database
    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone,
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' })
        }
    }

    renderRow = ({ item }) => {
        return (
            // display messages
            <View style={{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.phone ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10,
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }


    render() {
        let { height, width } = Dimensions.get('window');
        return (
            <SafeAreaView style={styles.messageinput}>
                <FlatList
                    style={{ padding: 10, height: height * 0.8 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* input box */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        placeholder="Type message..."
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{ paddingBottom: 10, marginLeft: 5 }}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}