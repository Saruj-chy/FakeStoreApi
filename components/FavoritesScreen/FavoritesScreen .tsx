import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
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
  }, []);

  const loadFavorites = async () => {
    const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setFavorites(favs);
  };

  const removeFromFavorites = async (id) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
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
      <View style={{ backgroundColor: '#20bead', padding: 10, flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>Favourites List</Text>


      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={1} // For grid view
        contentContainerStyle={styles.container}
      />


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
});

export default FavoritesScreen;
