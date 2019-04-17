import React from 'react';
import { SafeAreaView, Text, TextInput, AsyncStorage, Alert, TouchableOpacity, Image } from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import config from '../static/config'

export default class EditScreen extends React.Component {

    static navigationOptions = {
        title: 'Profile'
    }

    state = {
        name: User.name,
        avatarSource: { uri: '' },
        loaded: false
    }

    upload3 = (res) => {
        const data = new FormData();
        data.append('name', 'avatar'); // you can append anyone.
        data.append('imageFile', {
            uri: res.uri,
            type: 'image/jpeg', // or photo.type
            name: res.fileName
        });
        fetch('http://10.11.142.6:3000/imageUpload', {
            method: 'post',
            headers: {
                "Accept": 'multipart/form-data',
                "Content-Type": 'multipart/form-data',
                "Connection": "close",
                "type": "getUserData",
            },
            body: data
        }).then(res => {
            console.log(res)
        })
            .catch((error) => {
                console.warn(error);
            });
    }

    // handel change name
    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    // handle showing image after image loaded
    // _finishLoading = function () {
    //     console.log("Finished loading");
    //     this.setState({ loaded: true });
    // }


    // showImage = () => {
    //     var image = <Image onLoadEnd={this._finishLoading.bind(this)} {...this.props} />;
    //     return this.state.loaded ? image : <Image {...this.props} source={Loader} />;
    // }

    //edit image
    editImage = () => {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ToApp = this.props.navigation;

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source)

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
                this.testHTTP()
                this.upload3(response)
                ToApp.navigate('App');
                console.log('finish')
            }
        });

        if (this.state.name.length < 3) {
            Alert.alert('Error', 'Please enter valid name.')
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).update({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('Success', 'Name have be changed.');
        }
    }

    //change name
    changeName = async () => {
        if (this.state.name.length < 3) {
            Alert.alert('Error', 'Please enter valid name.')
        } else if (User.name !== this.state.name) {
            firebase.database().ref('users').child(User.phone).update({ name: this.state.name });
            User.name = this.state.name;
            Alert.alert('Success', 'Name have be changed.');
        }
    }

    //log out
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
        // change connections
        firebase.database().ref("users").child(User.phone).update({ connections: "offline", lastOnline: firebase.database.ServerValue.TIMESTAMP });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
                <Image
                style={{width: 50, height: 50}}
                    source={{ uri: config.nodeServer + 'imageDownload?img=' + 'download.jpg' }}
                />
                <Text style={{ fontSize: 20 }}>
                    {User.phone}
                </Text>
                <TextInput
                    style={styles.input}
                    // display user name
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Change name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.editImage}>
                    <Text style={styles.btnText}>Edit image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._logOut}>
                    <Text style={styles.btnText}>LOGOUT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}