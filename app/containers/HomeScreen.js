import React, { Component } from 'react'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Button,
  Text,
  Item,
  Input,
  H1,
  Title,
  Icon,
  View,
  Badge,
  Thumbnail
} from 'native-base'
import { connect } from 'react-redux'
import { StyleSheet, ImageBackground } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
// import VideoPlayer from 'react-native-video-controls';
import { Video } from 'expo'
import VideoPlayer from '@expo/videoplayer'
import { translate } from '../i18n'
import * as loginActions from '../actions/loginActions'
import * as userActions from '../actions/userActions'
import CustomFooter from '../components/CustomFooter'
import * as uiColor from '../constants/uiColor'

function createStyleSheet(organizationColor) {
  return StyleSheet.create({
    header: {
      backgroundColor: uiColor.getSecondaryColor(organizationColor)
    },
    headerTitle: {
      color: '#FFF',
      fontSize: 18,
      alignSelf: 'center'
    },
    topNotificationView: {
      backgroundColor: uiColor.getThirdColor(organizationColor), // '#BC1F3D',
      width: '100%',
      padding: 12,
      paddingTop: 30,
      paddingBottom: 10
    },
    topNotificationText: {
      fontSize: 18,
      color: '#FFF'
    },
    topNotificationTextSmall: {
      fontSize: 14,
      color: '#FFF'
    },
    subViewContainer: {
      marginTop: 10,
      flex: 1,
      flexDirection: 'row'
    },
    subViewLeft: {
      width: '49%',
      height: 85,
      backgroundColor: '#333',
      marginRight: '2%',
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 0
    },
    subViewRight: {
      width: '49%',
      height: 85,
      backgroundColor: '#333',
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 0
    },
    subViewText: {
      fontSize: 18,
      color: '#FFF',
      paddingLeft: 9,
      paddingTop: 34
    },
    subViewTextSmall: {
      fontSize: 14,
      paddingLeft: 9,
      color: '#FFF'
    },
    showVideoView: {
      backgroundColor: '#333',
      height: 178,
      marginTop: 10,
      paddingTop: 0,
      paddingBottom: 0
    },
    subVideoViewText: {
      fontSize: 18,
      color: '#FFF',
      paddingLeft: 9,
      paddingTop: 125
    },
    imageBackground: {
      width: '100%',
      height: '100%'
    },
    videoContainer: {
      marginTop: 10,
      width: '100%',
      height: 178
    },
    controlBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  })
}

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 'actions',
      videoState: 0,
      shouldPlay: true,
      styles: createStyleSheet(props.organizationColor)
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps) {
      this.setState({
        styles: createStyleSheet(nextProps.organizationColor)
      })
    }
  }

  componentDidMount = () => {
    const { auth, register } = this.props
    if (
      register.isRegistered &&
      auth.fromRegistration &&
      !auth.checkedOnboarding.readyToBegin
    ) {
      Actions.push('introduceReadyToBegin')
    }
  }

  playVideo = () => {
    let $this = this
    this.setState({ videoState: 1 })
    // setTimeout(function() {
    //   console.log($this.videoRef);
    //   $this.videoRef.presentFullscreenPlayer();
    // }, 500)
  }

  handlePlayAndPause = () => {
    this.setState(prevState => ({
      shouldPlay: !prevState.shouldPlay
    }))
  }

  handleLogout = () => {
    this.props.loginActions.logoutRequest(
      this.props.auth.access_token,
      this.props.auth.token_type
    )
  }

  render() {
    const locale = 'en'
    const { auth } = this.props
    const { activePage, videoState, styles } = this.state
    let notification = {
      title: 'TOP Notification for User',
      content: 'Subtitle of notification'
    }
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 3 }}>
            <Title style={styles.headerTitle}>
              {translate('Actions', locale)}
            </Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={this.handleLogout}>
              <Icon name="more" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ padding: 6 }}>
            {notification.title && (
              <View style={styles.topNotificationView}>
                <Text style={styles.topNotificationText}>
                  {translate(notification.title, locale)}
                </Text>
                <Text style={styles.topNotificationTextSmall}>
                  {translate(notification.content, locale)}
                </Text>
              </View>
            )}
            <View style={styles.subViewContainer}>
              <Button
                transparent
                style={styles.subViewLeft}
                onPress={() => Actions.push('rum')}
              >
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('RUMs', locale)}
                  </Text>
                </ImageBackground>
              </Button>
              <Button transparent style={styles.subViewRight}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Notifications', locale)}
                  </Text>
                </ImageBackground>
              </Button>
            </View>
            <View style={styles.subViewContainer}>
              <Button transparent style={styles.subViewLeft}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Tasks', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate('Set Milestones', locale)}
                  </Text>
                </ImageBackground>
              </Button>
              <Button transparent style={styles.subViewRight}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Learn', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate('Library', locale)}
                  </Text>
                </ImageBackground>
              </Button>
            </View>
            {videoState === 0 ? (
              <Button
                transparent
                style={styles.showVideoView}
                onPress={() => this.playVideo()}
              >
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/videoViewBackground.jpg')}
                >
                  <Text style={styles.subVideoViewText}>
                    {translate('Watch Video', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate(
                      'Soft Skills the Five Things Employers Really Want',
                      locale
                    )}
                  </Text>
                </ImageBackground>
              </Button>
            ) : (
              <View style={styles.videoContainer}>
                <Video
                  source={require('../images/201605-Acacia-RUMs.mp4')}
                  shouldPlay={this.state.shouldPlay}
                  resizeMode="cover"
                  style={{ width: '100%', height: 178 }}
                  ref={ref => (this.videoRef = ref)}
                />
                <View style={styles.controlBar}>
                  <Icon
                    name={this.state.shouldPlay ? 'pause' : 'play'}
                    onPress={this.handlePlayAndPause}
                  />
                </View>
              </View>
            )}
            <View style={styles.subViewContainer}>
              <Button transparent style={styles.subViewLeft}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Mentor', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate('Contact', locale)}
                  </Text>
                </ImageBackground>
              </Button>
              <Button transparent style={styles.subViewRight}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Open Jobs', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate('Subtitle', locale)}
                  </Text>
                </ImageBackground>
              </Button>
            </View>
            <View style={styles.subViewContainer}>
              <Button transparent style={styles.subViewLeft}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Title', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate('Subtitle', locale)}
                  </Text>
                </ImageBackground>
              </Button>
              <Button transparent style={styles.subViewRight}>
                <ImageBackground
                  style={styles.imageBackground}
                  source={require('../images/subViewBackground.jpg')}
                >
                  <Text style={styles.subViewText}>
                    {translate('Title', locale)}
                  </Text>
                  <Text style={styles.subViewTextSmall}>
                    {translate('Subtitle', locale)}
                  </Text>
                </ImageBackground>
              </Button>
            </View>
          </View>
        </Content>
        <CustomFooter active={activePage} locale={locale} />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const { register, auth, organization } = state

  return {
    register,
    auth,
    organizationColor: organization.developerJson
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
