/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
} from 'react-native-fontawesome';
const HomePage = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const json = await response.json();
            setData(json);
            // console.log(json);
        } catch (error) {
            console.error(error);
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
        <SafeAreaView style={{ flex: 1, backgroundColor:'#eaf8f8' }}>
            <View style={{ backgroundColor: '#20bead', padding: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>Home Page</Text>
                <FontAwesome
                        style={styles.iconStyle}
                        icon={SolidIcons.heart}
                    />

            </View>
            <View style={{flex:1, justifyContent:'center'}}>
                {
                    data.length>0? <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id} // Assumption: your objects have an 'id' key
                    numColumns={2} // For grid view
                    contentContainerStyle={styles.container}
                /> :
                (<View style={{ flexDirection:'column', justifyContent: 'center', alignItems: 'center',  }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color:'black' }}>Loading...</Text>
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
        paddingHorizontal:7
    },
    text: {
        fontSize: 16,
    },
    image: {
        width: 150,
        height: 150,
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
    price:{
        fontWeight: '900',
        color:'#20bead',
        fontSize:16
    }
});

export default HomePage;