import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

const SplashPage = ({navigation}) => {
    const imageUrl = "https://fakestoreapi.com/icons/logo.png";

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user_uid') || null
          console.log(value);
          if(value !== null) {
            navigation.navigate("homepage");
          }else{
            navigation.navigate("signin");
          }
        } catch(e) {
          console.log(e);
        }
      }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#eaf8f8', justifyContent:'center'}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image source={{ uri: imageUrl }} style={{height:150, width:150}} ></Image>
                <Text style={{textAlign:'center', color:'black', margin:20, fontSize:22, fontWeight:'900'}}>Fake Store API</Text>
            </View>


        </SafeAreaView>
    );
};

export default SplashPage;