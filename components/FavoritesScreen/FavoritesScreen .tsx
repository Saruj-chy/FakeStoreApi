import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    
    loadFavorites();
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  


  const loadFavorites = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setFavorites(favs);
  };

  const removeFromFavorites = async (id) => {
    Alert.alert("Hold on!", "Are you sure you want to remove the item?", [
      {
        text: "No",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "YES", onPress: async () => {
          const newFavorites = favorites.filter(fav => fav.id !== id);
          await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
          setFavorites(newFavorites);
        }
      }
    ]);
    return true;


  };
  


  const renderItem = ({ item }) => (
    <View
      style={styles.item}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity onPress={() => removeFromFavorites(item.id)} >
        <FontAwesome
          style={styles.iconStyle}
          icon={SolidIcons.heart}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eaf8f8' }}>
      <View style={{ backgroundColor: '#20bead', padding: 10, flexDirection: 'row', paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <FontAwesome
            style={styles.arrowLeft}
            icon={SolidIcons.arrowLeft}
          />
        </TouchableOpacity>
        <Text style={{ flex:1, color: 'white', textAlign: 'center', fontSize: 22, }}>Favourites List</Text>


      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        {
          favorites.length > 0 ? <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={1} // For grid view
            contentContainerStyle={styles.container}
          /> :
            (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'black' }}>Loading...</Text>
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
  text: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontWeight: '900',
    color: '#20bead',
    fontSize: 16
  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: '#f25570',
  },
  arrowLeft: {
    fontSize: 30,
    color: 'white',
  },
});

export default FavoritesScreen;
