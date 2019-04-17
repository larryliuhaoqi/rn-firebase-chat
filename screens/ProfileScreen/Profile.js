import React, { Component } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,SafeAreaView,
} from 'react-native'
import { Button } from 'react-native-elements'
import {
  TabBar,
  TabView,
  PagerPan,
  PagerScroll,
} from 'react-native-tab-view'
import PropTypes from 'prop-types'
import { image } from '../../images/image'
import profileStyles from './ProfileStyle'
import Posts from './Posts'


const styles = StyleSheet.create({ ...profileStyles });

class Profile extends React.Component {
  static propTypes = {
    navigation:PropTypes.object,
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pos: PropTypes.string.isRequired,
    fli: PropTypes.string.isRequired,
    fle: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        imageHeight: PropTypes.number,
        imageWidth: PropTypes.number,
        postWidth: PropTypes.number,
      })
    ).isRequired,
  }

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }

  state = {
    tabs_1: {
      index: 0,
      routes: [
        { key: '1', title: 'POSTS'},
        { key: '2', title: 'DESCR' },
        { key: '3', title: 'LOCAT' },
      ],
    },
    postsMasonry: {},
  }

  onButtonPress(){
    // console.log( "111111111" )
    this.props.navigation.navigate('Settings');
    console.log(this.props);
  }

  onButtonPress_1(){
    this.props.navigation.navigate('UserInfoStack');
    console.log(this.props);
  }

  onButtonPress_2(){
    this.props.navigation.navigate('Follower');
    console.log(this.props);
  }

  onButtonPress_3(){
    this.props.navigation.navigate('Following');
    console.log(this.props);
  }

  componentWillMount() {
    this.setState({
      postsMasonry: image.mansonry(this.props.posts, 'imageHeight'),
    })
  }

  _handleIndexChange_1 = index => {
    this.setState({
      tabs_1: {
        ...this.state.tabs_1,
        index,
      },
    })
  }

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorTab}
        pressOpacity={0.8}
        renderLabel={this._renderLabel(props)}
        style={styles.tabBar}
      />
    )
  }

  _renderScene = ({ route: { key } }) => {
    switch (key) {
      case '1':
        return this.renderMansonry2Col_1()
      case '2':
        return this.renderMansonry2Col_2()
      case '3':
        return this.renderMansonry2Col_3()
      default:
        return <View />
    }
  }

  _renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? 'black' : 'gray')
    )
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    })

    return (
      <View style={styles.tabRow}>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  _renderPager = props => {
    return Platform.OS === 'ios' ? (
      <PagerScroll {...props} />
    ) : (
      <PagerPan {...props} />
    )
  }

  renderContactHeader = () => {
    const { avatar, avatarBackground, name, bio, pos, fle, fli } = this.props
    return (
      <View 
       style={styles.headerContainer}
       >
        <View style={styles.coverContainer}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
            <ImageBackground
              source={{
                uri: avatarBackground,
              }}
              style={styles.coverImage}
            >
              <View style={styles.coverTitleContainer}>
                <Text style={styles.coverTitle} />
              </View>
              <View style={styles.coverMetaContainer}>
                <Text style={styles.coverName}>{name}</Text>
                <Text style={styles.coverBio}>{bio}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>




      <View style={styles.infoBar}>
        <View style={styles.mansonryContainer}>
        <TouchableOpacity onPress={this.onButtonPress_1.bind(this)}>
            <Text style={styles.tabLabelNumber_2}>{pos}</Text>
            <Text style={styles.tabLabelText_2}>POSTS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onButtonPress_2.bind(this)}>
            <Text style={styles.tabLabelNumber_2}>{fle}</Text>
            <Text style={styles.tabLabelText_2}>FOLLOWERS</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={this.onButtonPress_3.bind(this)}>
            <Text style={styles.tabLabelNumber_2}>{fli}</Text>
            <Text style={styles.tabLabelText_2}>FOLLOWING</Text>
          </TouchableOpacity>
        </View>
      </View>

        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>


      </View>
    )
  }

  renderMansonry2Col_1 = () => {
    return (
      <View style={styles.mansonryContainer}>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={this.state.postsMasonry.leftCol}
          />
        </View>
        <View>
          <Posts
            containerStyle={styles.sceneContainer}
            posts={this.state.postsMasonry.rightCol}
          />
        </View>
      </View>
    )
  }

  renderMansonry2Col_2 = () => {
    return (
      <View style={styles.mansonryContainer}>
          <Text>2</Text>
      </View>
    )
  }

  renderMansonry2Col_3 = () => {
    return (
      <View style={styles.mansonryContainer}>
          <Text>3</Text>
      </View>
    )
  }
  


  render() {
    return (
      <ScrollView style={styles.scroll }>

      { console.log( this.props.navigation)}
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}


            <View style={{ flexDirection: 'row', justifyContent: 'space-around', 
            borderTopWidth: 1, borderTopColor: '#eae5e5' }}></View>
            
            
            <TabView
              navigationState={this.state.tabs_1}
              onIndexChange={this._handleIndexChange_1}
              renderTabBar={this._renderHeader}
              renderPager={this._renderPager}
              renderScene={this._renderScene}

              style={[styles.tabContainer, this.props.tabContainerStyle]}
            />
          </View>
        
        </View> 
      </ScrollView>
    )
  }

}


export default Profile;
