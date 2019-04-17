import React from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import PropTypes from 'prop-types'
import contactData from './contact.json'
import { connect } from 'react-redux'
// import { InfoNav } from '../SettingScreen/components'
import Profile from './Profile'

class ProfileScreen extends React.Component {
  constructor( props) {
    super(props);
      console.log(props);
  }

  // static navigationOptions =  ({ navigation }) => ({
  //   header: (
  //     <InfoNav
  //       title= "ChatChat"
  //       navigation={navigation}
  //       leftIcon={{
  //         type: 'ionicon',
  //         name: 'md-list',
  //         size: 26,
  //       }}
  //     />
  //   ),
  //   // title: 'Foodie Pick',
  // });

 

  render() {

    return (
      <View>
        {/* { console.log( contactData)} 
        <Button title="Regiester" onPress={this._signInAsync}/>
            */}
        <Profile 
        { ...contactData }
        navigation={this.props.navigation}
        />
      </View>  
        
        );
  }
}

// const mapStateToProps = state =>{
//   const { homeScreenVideoListData } = state.homeScreen;
//   return {
//     homeScreenVideoListData,
//   };
// };

// export default connect(mapStateToProps)(ProfileScreen);
export default ProfileScreen;
