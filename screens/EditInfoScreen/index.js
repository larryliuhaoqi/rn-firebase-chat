import React from 'react'
import PropTypes from 'prop-types'

import contactData from '../../data/contact.json'
import Profile from './Profile'

const ProfileScreen = ({ navigation }) => (
<Profile {...contactData}  navigation={navigation}/>
)

ProfileScreen.navigationOptions = ({ navigation }) => ({
    header: null,
})

// ProfileScreen.navigationOptions = ({ navigation }) => ({
//   header: (
//     <Nav
//       title="Edit"
//       navigation={navigation}
//       leftIcon={{
//         type: 'ionicon',
//         size: 26,
//       }}
//     />
//   ),
// })

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ProfileScreen
