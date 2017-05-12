'use strict';

import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native'

class AppSearch extends Component {

static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title,
    headerRight: <Button color={screenProps.tintColor} 
                    title='Back'
                    onPress={() => navigation.goBack()} >
                </Button>,
      });

  render (){
    return (<View style={[style.container, this.props.style]} >
                <TextInput style={style.searchTextInput} 
                  autoCapitalize={'characters'}
                  onChange={this._onBeginSearch.bind(this)}
                  placeholder='Search for items'/>
                <View style={style.searchResultsContainer} />
            </View>);
  }

  _onBeginSearch(event){
    var searchText = event.nativeEvent.text.trim();
    if (searchText.length > 2) {
      this._fetchSearchResults(searchText);
    } else {
      // Set View state or clean up the view
    }
  }

  _fetchSearchResults(searchText) {
    try {
        var searchRequest = new Request('https://example.com/search?key='+ searchText, 
          {method: 'GET', headers:{'Key': 'value'}}); 

        fetch(searchRequest)
          .then((response) => this._parseResponse(response))
          .catch((error) => {
            console.error('Error fetching search results for ' + searchText + '. Error:' + error);
          });
      } catch (error) {
        console.error('Error fetching data:' + error);
      }
  }

  _parseResponse(response){
    if (response.status !== 200) {
        console.error('Something went wrong while fetching search results!');
      return;
    }

    response.json()
      .then((json) =>
        {
          console.log('Response Body for search from server: ' + json);
        });
  }

}

const style = StyleSheet.create({
    container:{
      flex:1, 
      flexDirection:'column',
      margin: 2,
      marginTop: 0,
    },
    navbar:{
      flex: .07,
    },
    noData: {
      margin: 5
    },
    searchTextInput: {
      flex:.05, 
      borderWidth:1, 
      margin:0,
      marginBottom: 0,
      backgroundColor:'white'
    },
    searchResultsContainer: {
      flex:.88, 
      borderWidth:0, 
      flexDirection: 'column',
      margin:5,
    },
});

module.exports = AppSearch;
