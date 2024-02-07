/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, ToastAndroid, View, AlertIOS, BackHandler, } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../FirebaseConfig';
// import { GoogleSignin, statusCodes  } from '@react-native-google-signin/google-signin';


const SignUp = ({navigation}) => {
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputPassword, setTextInputPassword] = useState('');
  const [textInputConfirmPassword, setTextInputConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState('');


  useEffect(()=>{
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  },[])

  const onSignInClick = async() => {
    console.log("email: "+textInputEmail+"  Password: "+ textInputPassword+"  Confirm Password:"+ textInputConfirmPassword);
    if (
      textInputEmail.length <= 0 ||
      textInputPassword.length <= 0 || 
      textInputConfirmPassword <= 0
    ) {
      console.log('please proveide actual value');
      notifyMessage('please proveide actual value');
    }else if(textInputPassword != textInputConfirmPassword){
      console.log('Password and ConfirmPassword are not match.');
      notifyMessage('Password and ConfirmPassword are not match.');
    } else{
     
      await firebase.auth()
      .createUserWithEmailAndPassword(textInputEmail, textInputPassword)
      .then(user => {
        if (user) {
          console.log(user);
          notifyMessage(user);
        }
      })
      .catch(error => {
        notifyMessage('Auth failed');
      });
    }
  }

  const onGoogleButtonPress = async() => {
    console.log("google sign in");
    // try {
    //     await GoogleSignin.hasPlayServices();
    //     // const userInfo = await GoogleSignin.signIn();
    //     // console.log('User Info --> ', userInfo);
    //     // notifyMessage(userInfo);

    //     const { idToken } = await GoogleSignin.signIn();
    //     console.log('User Info --> ', idToken);
    //     notifyMessage(idToken);

    //     // Create a Google credential with the token
    //     const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
      
    //     // Sign-in the user with the credential
    //     const value = firebase.auth().signInWithCredential(googleCredential);
    //     console.log("Value", value);



    //   } catch (error) {
    //     console.log('Message', JSON.stringify(error));
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       notifyMessage('User Cancelled the Login Flow');
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //         notifyMessage('Signing In');
    //     } else if (
    //         error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    //       ) {
    //         notifyMessage('Play Services Not Available or Outdated');
    //     } else {
    //         notifyMessage(error.message);
    //     }
    //   }

    







    // try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     setUserInfo(userInfo);
    //     console.log(userInfo);
    //     console.log(userInfo.user.name);
    //     console.log(userInfo.user.email);
    //     notifyMessage(userInfo);
    //   } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         console.log(error.code);
    //       // user cancelled the login flow
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //         console.log(error.code);
    //       // operation (e.g. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         console.log(error.code);
    //       // play services not available or outdated
    //     } else {
    //       // some other error happened
    //     }
    //   }

    // GoogleSignin.configure({
    //     scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
    //     webClientId:
    //       '585979483769-1r8uifp4shg463amvgitmu8jvfedndmm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //     offlineAccess: true,
    //   });
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
       
    //   } catch (error) {
    //     console.log(error);
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       // user cancelled the login flow
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //       // operation (e.g. sign in) is in progress already
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //       // play services not available or outdated
    //     } else {
    //       // some other error happened
    //     }
    //   }


    // try {
    //     await GoogleSignin.hasPlayServices({
    //       // Check if device has Google Play Services installed
    //       // Always resolves to true on iOS
    //       showPlayServicesUpdateDialog: true,
    //     });
    //     const userInfo = await GoogleSignin.signIn();
    //     console.log('User Info --> ', userInfo);
    //     notifyMessage(userInfo);
    //   } catch (error) {
    //     console.log('Message', JSON.stringify(error));
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //       notifyMessage('User Cancelled the Login Flow');
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //         notifyMessage('Signing In');
    //     } else if (
    //         error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    //       ) {
    //         notifyMessage('Play Services Not Available or Outdated');
    //     } else {
    //         notifyMessage(error.message);
    //     }
    //   }
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

          <Text style={{ marginTop: 50, fontSize: 30, color: "#598d28", fontWeight: 'bold' }}>Sign Up</Text>
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
          <TextInput
            style={styles.inputs}
            onChangeText={text => setTextInputConfirmPassword(text)}
            value={textInputConfirmPassword}
            placeholder="Enter your Confirm Password"
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
          onPress={onGoogleButtonPress}
            style={{ backgroundColor: "#598d28", color: 'white', padding: 10, justifyContent:'center', textAlign:'center', margin:10 }}
          >
            Google
          </Text>

          <Text
          onPress={
           () => navigation.navigate("signin")
          }
            style={{ padding: 10, justifyContent:'center', textAlign:'center', margin:10 }}
          >
            Already have a account?
          </Text>
          </View>
          {userInfo!=null && <Text>{userInfo}</Text>}

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


export default SignUp;
