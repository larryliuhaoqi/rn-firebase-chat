import React from 'react';
import { SafeAreaView, Text, TextInput, AsyncStorage, Alert, TouchableOpacity, Image } from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import config from '../static/config'

export default class AddPostScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit Post'
    }

    state = {
        name: User.name,
        postImg: { uri: '../images/add.png' },
        description: '',
        img:''
    }

    uploadImg = (res) => {
        const data = new FormData();
        data.append('name', 'avatar'); // you can append anyone.
        data.append('imageFile', {
            uri: res.uri,
            type: 'image/jpeg', // or photo.type
            name: res.fileName
        });
        this.setState({img: res.fileName})
        console.log('img: '+this.state.img)
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
        console.log("img "+ this.state.img)
        updates['post/' + User.phone + '/' + postId_] = post;
        firebase.database().ref().update(updates);
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

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

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
                {/* <Image source={this.state.avatarSource} style={styles.uploadAvatar} /> */}
                <Image
                    style={{ width: 50, height: 50 }}
                    source={this.state.postImg}
                />
                <Text style={{ fontSize: 20 }}>
                    {User.phone}
                </Text>
                <TextInput
                    style={styles.input}
                    // display user name
                    value={this.state.description}
                    onChangeText={this.handleChange('description')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Change name</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.editImage}>
                    <Text style={styles.btnText}>Edit image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.submitPost();
                    this.props.navigation.navigate('Home'); // TODO
                }}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}