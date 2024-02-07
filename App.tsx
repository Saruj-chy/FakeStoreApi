/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from 'react';
import {
  StyleSheet,

} from 'react-native';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import HomePage from './components/HomePage/HamePage';
import ProductDetailScreen from './components/ProductDetail/ProductDetailScreen';
import FavoritesScreen from './components/FavoritesScreen/FavoritesScreen ';
import SplashPage from './components/SplashPage/SplashPage';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
}, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splashpage">
      <Stack.Screen
          name="splashpage"
          component={SplashPage}
          options={{
            headerShown: false,
          }}
        />
      <Stack.Screen
          name="homepage"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signin"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="product_detail"
          component={ProductDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="favourite_screen"
          component={FavoritesScreen}
          options={{
            headerShown: false,
          }}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
