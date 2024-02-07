/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useState } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, ToastAndroid, View, AlertIOS, } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../FirebaseConfig';
// import auth from "@react-native-firebase/auth";



const SignIn = ({navigation}) => {
  const [textInputEmail, setTextInputEmail] = React.useState('');
  const [textInputPassword, setTextInputPassword] = React.useState('');
  const [textInputConfirmPassword, setTextInputConfirmPassword] = React.useState('');


  const onSignInClick = async() => {
    if (
      textInputEmail.length <= 0 ||
      textInputPassword.length <= 0 ) {
      console.log('please proveide actual value');
      notifyMessage('please proveide actual value');
    }else{
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(textInputEmail, textInputPassword);
        const user = userCredential.user;
        navigation.navigate("profile");
        console.log('User authenticated:'+ user.email);
        notifyMessage(user);
        
      } catch (error) {
        console.error('Authentication failed:'+ error.message);
        notifyMessage("Auth Failed"+error.message);
      }
      
    }
  }
  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };


  return <SafeAreaView style={{ flex: 1 }}>
    <ScrollView >
      <View >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginTop: 150
          }}>

          <Text style={{ marginTop: 50, fontSize: 30, color: "#598d28", fontWeight: 'bold' }}>Sign In</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            onChangeText={text => setTextInputEmail(text)}
            value={textInputEmail}
            placeholder="Enter your Email"
          />
          <TextInput
            style={styles.inputs}
            onChangeText={text => setTextInputPassword(text)}
            value={textInputPassword}
            placeholder="Enter your Password"
          />
          
        </View>
        <View>
          <Text
          onPress={onSignInClick}
            style={{ backgroundColor: "#598d28", color: 'white', padding: 10, justifyContent:'center', textAlign:'center', margin:10 }}
          >
            Sign In
          </Text>
        </View>
        <View>
          <View style={{justifyContent:'center',  }}>
            <Text style={{textAlign:'center'}}>---------------------------------------------   OR  -----------------------------------------------</Text>
          </View>
          <View>
          <Text
            style={{ backgroundColor: "#598d28", color: 'white', padding: 10, justifyContent:'center', textAlign:'center', margin:10 }}
          >
            Google
          </Text>

          <Text
          onPress={
           () => navigation.navigate("signup")
          }
          
            style={{ padding: 10, justifyContent:'center', textAlign:'center', margin:10 }}
          >
            Create a new account?
          </Text>
          </View>
          

        </View>
      </View>
    </ScrollView>
  </SafeAreaView>;
};


const styles = StyleSheet.create({
  inputs:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin:20
  }
});


export default SignIn;
