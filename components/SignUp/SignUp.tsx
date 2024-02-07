/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, ToastAndroid, View, AlertIOS, BackHandler, TouchableOpacity, Image, } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin, statusCodes  } from '@react-native-google-signin/google-signin';


const SignUp = ({ navigation }) => {
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputPassword, setTextInputPassword] = useState('');
  const [textInputConfirmPassword, setTextInputConfirmPassword] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [])

  const onSignUpClick = async () => {
    setIsLoad(true);
    if (
      textInputEmail.length <= 0 ||
      textInputPassword.length <= 0 ||
      textInputConfirmPassword <= 0
    ) {
      console.log('please proveide actual value');
      notifyMessage('please proveide actual value');
      setIsLoad(false);
    } else if (textInputPassword != textInputConfirmPassword) {
      console.log('Password and ConfirmPassword are not match.');
      notifyMessage('Password and ConfirmPassword are not match.');
    } else {

      await firebase.auth()
        .createUserWithEmailAndPassword(textInputEmail, textInputPassword)
        .then(user => {
          if (user) {

            const user_uid = user.user.uid;
            console.log(user_uid);
            notifyMessage("Sign-up Successfully");

            storeData(user_uid);
            setIsLoad(false);
            navigation.navigate("homepage");

          }
        })
        .catch(error => {
          notifyMessage('Auth failed');
        });
    }
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user_uid', value)
    } catch (e) {
      // saving error
    }
  }

  const onGoogleButtonPress = async () => {
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

  return <SafeAreaView style={styles.safeAreaStyle}>
    <ScrollView >
      <View >
        <View
          style={styles.titleView}>

          <Text style={styles.titleText}>Sign Up</Text>
        </View>
        <View>
          <TextInput
            style={styles.inputs}
            onChangeText={text => setTextInputEmail(text)}
            value={textInputEmail}
            placeholder="Enter your Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.inputs}
            onChangeText={text => setTextInputPassword(text)}
            value={textInputPassword}
            placeholder="Enter your Password"
            secureTextEntry={true}

          />
          <TextInput
            style={styles.inputs}
            onChangeText={text => setTextInputConfirmPassword(text)}
            value={textInputConfirmPassword}
            placeholder="Enter your Confirm Password"
            secureTextEntry={true}
          />
        </View>
        <View>
          <Text
            onPress={
              () => navigation.navigate("signin")
            }
            style={styles.accStyle}
          >
            Already have a account?
          </Text>
          <Text
            onPress={onSignUpClick}
            style={styles.signBtn}
          >
            Sign Up
          </Text>
        </View>
        <View>
          <View style={{ justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center' }}>---------------------------------------------   OR  -----------------------------------------------</Text>
          </View>
          <View>

            <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
              <View style={styles.buttonContent}>
                <Image
                  source={{ uri: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" }} // Update path accordingly
                  style={styles.logo}
                />
                <Text style={styles.text}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>


          </View>
          {userInfo != null && <Text>{userInfo}</Text>}

        </View>
      </View>
    </ScrollView>
    {
      isLoad && <View style={styles.overlay}>
        <Text style={styles.overlayText}>Loading...</Text>
      </View>
    }
  </SafeAreaView>;
};


const styles = StyleSheet.create({
  safeAreaStyle:
  {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleView:
  {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 150
  },
  titleText:
  {
    fontSize: 30,
    color: "#598d28",
    fontWeight: 'bold'
  },
  inputs: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will cover the entire screen
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',

  },

  overlayText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
  },
  signBtn: {
    backgroundColor: "#598d28",
    color: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 10,
    fontSize: 22,
    fontWeight: '900',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    shadowColor: '#000',
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    color: '#757575', // Google button text color
    fontWeight: 'bold',
  },
  accStyle: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    textAlign: 'right',
    color: 'black',
    fontSize: 18,
    marginTop:50
  },
});


export default SignUp;
