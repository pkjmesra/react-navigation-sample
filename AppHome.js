'use strict';

import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight
} from 'react-native'

const AppSearch = require('./AppSearch');

class AppHome extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title,
  });

  render (){
    return (<View style={style.mainContainer}>
              <View style={{flex: .45}} />
              <TouchableHighlight
                  style={style.button}
                  onPress={this._onButtonPressed.bind(this)} 
                  underlayColor='#00A8f8' >
                  <Text style={style.buttonText}>Touch Me</Text>
              </TouchableHighlight>
              <View style={{flex: .45}} />
            </View>);
  }

  _onButtonPressed(){
    this.props.navigation.navigate('AppSearch',{title: 'Search'});
  }
}

const style = StyleSheet.create({
    mainContainer: {
      flex:1,
      flexDirection:"column",
      margin: 2,
      marginTop: 20,
    },
    button: {
      flex:.1,
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
    buttonText: {
      color:'white'
    },
  });

module.exports = AppHome;
