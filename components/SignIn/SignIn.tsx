/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform, StyleSheet, Text, ToastAndroid, View, AlertIOS, Alert, BackHandler, TouchableOpacity, Image, } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignIn = ({ navigation }) => {
  const [textInputEmail, setTextInputEmail] = useState('');
  const [textInputPassword, setTextInputPassword] = useState('');
  const [textInputConfirmPassword, setTextInputConfirmPassword] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

 

  const onSignInClick = async () => {
    setIsLoad(true);
    if (
      textInputEmail.length <= 0 ||
      textInputPassword.length <= 0) {
      console.log('please proveide actual value');
      notifyMessage('please proveide actual value');
      setIsLoad(false);
    } else {
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(textInputEmail, textInputPassword);
        const user = userCredential.user;
        const user_uid = user.uid;
        storeData(user_uid);
        setIsLoad(false);
        navigation.navigate("homepage");
        console.log('User authenticated:' + user.email);
        console.log('User uid:' + user.uid);
        notifyMessage("Sign-in Successful");

      } catch (error) {
        console.error('Authentication failed:' + error.message);
        notifyMessage("Sign-in Failed" + error.message);
      }

    }
  }
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user_uid', value)
    } catch (e) {
      // saving error
    }
  }
  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };


  return <SafeAreaView style={{ flex: 1, }}>
    <ScrollView >
      <View>
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
            secureTextEntry={true}
          />

        </View>
        <View>
        <Text
              onPress={
                () => navigation.navigate("signup")
              }

              style={styles.accStyle}
            >
              Create a new account?
            </Text>
          <Text
            onPress={onSignInClick}
            style={styles.signBtn}
          >
            Sign In
          </Text>
        </View>
        <View>
          <View style={{ justifyContent: 'center', }}>
            <Text style={{ textAlign: 'center' }}>---------------------------------------------   OR  -----------------------------------------------</Text>
          </View>
          <View>
          
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Image
                  source={{uri:"https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"}} // Update path accordingly
                  style={styles.logo}
                />
                <Text style={styles.text}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>

            
          </View>


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
  inputs: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 20
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
    marginTop:20,
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
  accStyle:{ 
    paddingHorizontal: 10, 
    justifyContent: 'center', 
    textAlign: 'right', 
    color:'black',
    fontSize:18
  },
});


export default SignIn;
