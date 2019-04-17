import React from 'react';
import { SafeAreaView, Text, TextInput, AsyncStorage, Alert, TouchableOpacity, Image } from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import config from '../static/config'
import { View } from 'native-base';

export default class AddPostScreen extends React.Component {

    static navigationOptions = {
        header: null,
        // title: 'Edit Post'
    }

    state = {
        name: User.name,
        postImg: { uri: '../images/add.png' },
        description: '',
        img: ''
    }

    uploadImg = (res) => {
        const data = new FormData();
        data.append('name', 'avatar'); // you can append anyone.
        data.append('imageFile', {
            uri: res.uri,
            type: 'image/jpeg', // or photo.type
            name: res.fileName
        });
        this.setState({ img: res.fileName })
        console.log('img: ' + this.state.img)
        fetch(config.nodeServer + 'imageUpload', {
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

    submitPost = async () => {
        let postId_ = firebase.database().ref('post').child(User.phone).push().key;
        let updates = {};
        let post = {
            description: this.state.description,
            time: firebase.database.ServerValue.TIMESTAMP,
            name: User.name,
            phone: User.phone,
            img: this.state.img
        }
        console.log("img " + this.state.img)
        updates['post/' + User.phone + '/' + postId_] = post;
        firebase.database().ref().update(updates);
    }


    // handel change name
    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    //edit image
    editImage = () => {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Image',
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
                this.setState({
                    postImg: source,
                });
                this.uploadImg(response)
                console.log(this.state.postImg)
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



    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={{
                        width: '100%',
                        height: 250,
                        marginBottom: 40,
                    }}
                    source={this.state.postImg}
                />
                <View>
                <TextInput
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        width: '100%',
                        marginBottom: 10,
                        borderRadius: 5,
                        padding: 15,
                    }}
                    // display user name
                    value={this.state.description}
                    onChangeText={this.handleChange('description')}
                />
                </View>
                <TouchableOpacity onPress={this.editImage}>
                    <Text style={styles.btnText}>Select image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.submitPost();
                    this.props.navigation.navigate('Home'); // TODO
                }}>
                    <Text style={styles.btnText}>Post now!</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}