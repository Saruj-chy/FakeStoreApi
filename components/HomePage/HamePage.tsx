/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
} from 'react-native-fontawesome';
import { firebase } from '../../FirebaseConfig';


const HomePage = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();

        const backAction = () => {
            Alert.alert("Exit App", "Do you want to exit the app?", [
                { text: "SignOut", onPress: () => signOutUser() },
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    const signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            await AsyncStorage.setItem('user_uid', "")
            navigation.navigate("signin");
        } catch (error) {
        }
    };


    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const json = await response.json();
            setData(json);
        } catch (error) {
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('product_detail', { productId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={styles.safeareaStyle}>
            <View style={styles.appbarView}>
                <Text style={styles.appbarText}>Home Page</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('favourite_screen');
                }}>
                    <FontAwesome
                        style={styles.iconStyle}
                        icon={SolidIcons.heart}
                    />
                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {
                    data.length > 0 ? <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.container}
                    /> :
                        (<View style={styles.loadView}>
                            <Text style={styles.loadStyle}>Loading...</Text>
                        </View>)
                }
            </View>
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    item: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingVertical: 30,
        paddingHorizontal: 7
    },
    appbarView: { 
        backgroundColor: '#20bead', 
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 20 
    },
    appbarText: { 
        color: 'white', 
        textAlign: 'center', 
        fontSize: 22
     },
    safeareaStyle: { 
        flex: 1, 
        backgroundColor: '#eaf8f8' 
    },
    loadView:{ 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    loadStyle: { 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: 18, 
        color: 'black' 
    },
    text: {
        fontSize: 16,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    iconStyle: {
        fontSize: 30,
        color: '#f25570',
    },
    price: {
        fontWeight: '900',
        color: '#20bead',
        fontSize: 16
    }
});

export default HomePage;