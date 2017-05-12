'use strict';

import React, {Component} from 'react'
import {
  TextInput,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
  Image,
  Keyboard
} from 'react-native'

import {NavigationActions} from 'react-navigation';

const AppHome = require('./AppHome');
const CheckBox = require('./CheckBox');

class AppLogin extends Component {

  constructor(props) {
    super(props);
    var {width, height} = Dimensions.get('window');
    this.state = {
      username:'',
      password:'',
      isLoading:false,
      errorMessage:'',
      layout:{
            height:height,
            width:width,
          }
    };
  }

  render() {
    var spinner = this.state.isLoading ? (<ActivityIndicator size='small' color='#00A8E1'/>): (<View />);
      return (
          <View style={[style.mainContainer, this._getMainLayoutStyle()]} 
            onLayout={this._onLayout.bind(this)}>
            <View style={[style.loginContainer, this._getLoginLayoutStyle()]} >
              
              <TextInput style={style.loginTextInput} 
                onChange={this._onUserNameTextChanged.bind(this)}
                returnKeyType = {"next"}
                autoCapitalize="none"
                ref='username'
                autoFocus = {true}
                autoCorrect={false}
                onSubmitEditing={(event) => { 
                  this.refs.password.focus();
                  }}
                placeholder='Email/Username'/>
              
              <TextInput style={style.loginTextInput} 
                onChange={this._onPasswordTextChanged.bind(this)}
                placeholder='Password'
                autoCorrect={false}
                returnKeyType = {"next"}
                onSubmitEditing={(event) => { 
                  this.refs.instId.focus();
                  }}
                secureTextEntry={true} 
                ref='password'/>
              
              <View style={style.signInContainer} >
                <CheckBox style={style.checkBox} 
                  onChange={this._onSavePasswordCheckChange.bind(this)} 
                  label='Save Password'
                  checked={true}
                  underlayColor='white' />
                <TouchableHighlight
                  style={style.signInButton}
                  onPress={this._onLoginPressed.bind(this)} 
                  underlayColor='#00A8f8' >
                  <Text style={style.signInText}>Sign In</Text>
                </TouchableHighlight>
              </View>
            </View>
            {spinner}
            <Text style={style.errorDescription}>{this.state.errorMessage}</Text>
            <View style={style.fillerBottom} />
          </View>
        );
  }

  _onLayout(event) {
    this.setState({
          layout:{
            height:event.nativeEvent.layout.height,
            width:event.nativeEvent.layout.width,
          }
        });
  }

  _onSavePasswordCheckChange(checked) {
    this.saveCredentials = checked;
  }

  _getLoginLayoutStyle(){
    return {
            marginLeft: (this.state.layout.width - 300)/2,
            marginTop: (this.state.layout.height > this.state.layout.width) || this.state.layout.height >=700? 60 : 10,
          };
  }

  _getMainLayoutStyle(){
    return {marginTop: this.state.layout.height > this.state.layout.width ? 100 : 0};
  }

  _onUserNameTextChanged(event) {
    this.setState({username: event.nativeEvent.text});
  }

  _onPasswordTextChanged(event) {
    this.setState({password: event.nativeEvent.text});
  }

  _onLoginPressed() {
    Keyboard.dismiss();
    this.setState({ isLoading: true,
                    errorMessage: '',
                  });
    var bodyDictionary = {
          'user.password' : this.state.password,
          'user.name' : this.state.username,
      };
    var bodyString = Object.keys(bodyDictionary)
          .map(key => key + '=' + encodeURIComponent(bodyDictionary[key]))
          .join('&');        
    var authRequest = new Request('https://example.com/path/to/login/API', 
    {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyString
    }); 

    fetch(authRequest)
      .then((response) => this._parseResponse(response))
      .catch((error) => {
        console.error(error);
        });
  }

  _parseResponse = function(response){

    console.log('Login Request RequestId(' + response.status + '):'+response.headers.get('Header-Name'));
    if (response.status !== 200) {
        this.setState({errorMessage : (response.status === 400 ? 
                                      response.headers.get('Header-Error-Key') :
                                      'We are currently having problems.Please try again.')
                      });
        this.setState({isLoading: false});
        // For this example, let's navigate to home screen anyways
        this.props.navigation.navigate('AppHome',{title: 'Home'});
        return;
    } else {
      // Success
      this.setState({isLoading: false, errorMessage:''});
    }
    response.json()
      .then((json) =>
        {
          this.props.navigation.navigate('AppHome',{title: 'Home'});
       });
  }
}

const style = StyleSheet.create({
    checkBox: {
      flex:.6, 
      margin: 5,
    },
    errorDescription: { 
      color: 'red',
      fontSize: 18,
      margin :20,
      textAlign: 'center'
    },
    fillerBottom: {
      flex:.6, 
      flexDirection:"column"
    },
    loginContainer: {
      width: 300,
      height: 170,
    },
    loginTextInput: {
      flex:.25, 
      borderWidth:1, 
      margin:5,
    },
    mainContainer: {
      flex:1,
      flexDirection:"column", 
    },
    signInButton: {
      flex:.4,
      ...Platform.select({
              android: {
                height: 30,
              }
            }),
      borderColor: '#00A8E1',
      borderRadius: 18,
      margin: 5,
      backgroundColor: '#00A8E1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    signInContainer: {
      flex:.25, 
      flexDirection:"row"
    },
    signInText: {
      color:'white'
    },
    wrapper: {
            flex: 1
          },
  });

module.exports = AppLogin;
