import React, { Component } from 'react'
import firebase from 'firebase';
import { Card, Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';

import {
  Image,
  Alert,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native'
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons';
import VectorIcon from '../../Navigation/VectorIcon';

import mainColor from './constants'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import User from '../../User';
import config from '../../static/config'


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class Contact extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    tels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  state = {
    telDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.tels),
    emailDS: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }).cloneWithRows(this.props.emails),
    name: User.name,

  }

  _logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    // change connections
    firebase.database().ref("users").child(User.phone).update({ connections: "offline", lastOnline: firebase.database.ServerValue.TIMESTAMP });
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

  //upload icon image
  uploadImage = (res) => {
    const data = new FormData();
    data.append('name', 'avatar'); // you can append anyone.
    data.append('imageFile', {
      uri: res.uri,
      type: 'image/jpeg', // or photo.type
      name: User.phone+'_icon.jpg'
    });
    fetch(config.nodeServer+'imageUpload', {
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

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

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
        this.uploadImage(response)
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


  onPressTel = number => {
  }

  onPressSms = () => {
  }

  onPressEmail = email => {

  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
    } = this.props

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: avatarBackground,
          }}
        >
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={this.editImage}>
              <Image
                style={styles.userImage}
                // source={{
                //   uri: avatar,
                // }}
                source={{ uri: config.nodeServer + 'imageDownload?img=' + User.phone+'_icon.jpg' }}
              />
            </TouchableOpacity>
            {/* <View style={{ flexDirection: 'row', flex: 1 }}> */}
            <TextInput
              style={styles.userNameText}
              value={this.state.name}
              onChangeText={this.handleChange('name')}
            />
            <TouchableOpacity onPress={this.changeName}>
              <VectorIcon
                name='check'
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </ImageBackground>
      </View >
    )
  }

  renderTel = () => (
    <ListView
      contentContainerStyle={styles.telContainer}
      dataSource={this.state.telDS}
      renderRow={({ id, name, number }, _, k) => {
        return (
          <Tel
            key={`tel-${id}`}
            index={k}
            name={name}
            number={User.phone}
            // onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
      }}
    />
  )

  renderEmail = () => (
    <ListView
      contentContainerStyle={styles.emailContainer}
      dataSource={this.state.emailDS}
      renderRow={({ email, id, name }, _, k) => {
        return (
          <Email
            key={`email-${id}`}
            index={k}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  )

  renderLogout = () => {
    // <ListView
    //   contentContainerStyle={styles.emailContainer}
    // />
    return (
      <TouchableOpacity
        onPress={this._logOut}
        style={{ backgroundColor: '#d10000', padding: 8 }}
      >
        <Text style={{
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white'
        }}>LOGOUT</Text>
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
            {this.renderLogout()}
          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default Contact
