import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const SplashPage = ({ navigation }) => {
  const imageUrl = "https://fakestoreapi.com/icons/logo.png";

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_uid') || null
      console.log(value);
      if (value !== null) {
        navigation.navigate("homepage");
      } else {
        navigation.navigate("signin");
      }
    } catch (e) {
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Image source={{ uri: imageUrl }} style={styles.iconStyle} ></Image>
        <Text style={styles.textStyle}>Fake Store API</Text>
      </View>


    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#eaf8f8',
    justifyContent: 'center'
  },
  viewStyle:
  {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle:
  {
    height: 150,
    width: 150
  },
  textStyle:
  {
    textAlign: 'center',
    color: 'black',
    margin: 20,
    fontSize: 22,
    fontWeight: '900'
  }
});
export default SplashPage;