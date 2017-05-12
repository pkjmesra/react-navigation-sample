import React, {Component} from 'react'
import {StackNavigator, Header} from 'react-navigation';
import {View, Text} from 'react-native';

import AppRoutes from './AppRoutes';
const AppLogin = require('./AppLogin');

const routeConfigs = {
  ...AppRoutes,
};

/*Checkout https://reactnavigation.org/docs/navigators/stack*/

const screenWithoutHeaders = [routeConfigs.AppLogin.screen.name,
                              routeConfigs.AppHome.screen.name,];
const _headerForNavigation = function(props){
  const state = props.navigation.state;
  const options = props.getScreenDetails(props.scene).options;
  / * If you want to do something with the headerLeft or headerRight rendering, uncomment and do it here. */
  /*
  if (typeof options.headerLeft !== 'undefined') {
    console.log('Left Header option will be rendered!');
  }
  */

    /*In other custom component classes, you can also do this: */
  /*
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.title,
    /*headerLeft: <TouchableHighlight color={screenProps.tintColor}
                    onPress={() => navigation.goBack()} >
                    <Text>&lt; Back</Text>
                </TouchableHighlight>,
      });
  */

  if (props.scene.index === 0 || screenWithoutHeaders.indexOf(state.routes[state.index].routeName) >= 0) {
    return null;
  } else {
    return (<Header {...props} />);
      //<View style={{height:46, marginTop: 20}} >{children}<Text>Here goes my header component</Text></View>);
  }
}

const stackNavigatorConfig = {
  initialRouteName:'AppLogin', /*Sets the default screen of the stack. Must match one of the keys in route configs.*/
  initialRouteParams: {}, /*The params for the initial route*/
  paths: {}, /*A mapping of overrides for the paths set in the route configs*/
  navigationOptions: { /*Default navigation options to use for screens*/
    title:' ', /*String that can be used as a fallback for headerTitle and tabBarLabel*/
    header: _headerForNavigation, /*React Element or a function that given HeaderProps returns a React Element, to display as a header. Setting to null hides header. */
    /*headerLeft: HeaderUtils.leftNavigationBarButton, /*React Element to display on the left side of the header*/
  }, 
  mode: 'card', /*Defines the style for rendering and transitions:
                  card - Use the standard iOS and Android screen transitions. This is the default.
                  modal - Make the screens slide in from the bottom which is a common iOS pattern. Only works on iOS, has no effect on Android.
                */
  headerMode: 'float', /* TODO: We should be using the Platform API here to determine what mode should be used.
                        Specifies how the header should be rendered:
                        float - Render a single header that stays at the top and animates as screens are changed. This is a common pattern on iOS.
                        screen - Each screen has a header attached to it and the header fades in and out together with the screen. This is a common pattern on Android.
                        none - No header will be rendered.
                      */
  
};

const AppNavigator = StackNavigator(routeConfigs, stackNavigatorConfig);
export default () => <AppNavigator screenProps={{tintColor:'blue', routeConfigs: routeConfigs, stackNavigatorConfig: stackNavigatorConfig}} />;
console.ignoredYellowBox = ['Warning: BackAndroid', 'Remote debugger'];
