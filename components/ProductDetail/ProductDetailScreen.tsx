
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`,
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    const checkFavoriteStatus = async () => {
      const favorites =
        JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      console.log(favorites);
      const isFav = favorites.some(fav => fav.id === productId);
      setIsFavorite(isFav);
    };

    fetchProductDetails();
    checkFavoriteStatus();
  }, [productId]);

  const toggleFavorite = async () => {
    // setIsFavorite(!isFavorite);

    const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== product.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(product);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#eaf8f8' }}>
      <View style={{ backgroundColor: '#20bead', padding: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('homepage');
        }}>
          <FontAwesome
            style={styles.arrowLeft}
            icon={SolidIcons.arrowLeft}
          />
        </TouchableOpacity>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>Product Details</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate('favourite_screen');
        }}>
          <FontAwesome
            style={styles.favouriteStyle}
            icon={SolidIcons.heart}
          />
        </TouchableOpacity>

      </View>
      <View style={styles.productContainer}>
        {
          product ? (<View style={styles.container}>
            <View style={{ alignItems: 'center', }}>
              <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <TouchableOpacity style={{ alignItems: 'center', }} onPress={toggleFavorite}>
              <FontAwesome
                style={styles.iconStyle}
                icon={isFavorite ? SolidIcons.heart : RegularIcons.heart}
              />
            </TouchableOpacity>
          </View>) : (<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'black' }}>Loading...</Text>
          </View>)
        }
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: 30,
    paddingHorizontal: 7,
    margin: 20
  },
  productContainer: {
    flex: 1,
    justifyContent: 'center',

  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'black'
  },
  price: {
    fontSize: 20,
    color: '#20bead',
    marginVertical: 10,
    marginStart: 20,
    fontWeight: '900'
  },
  description: {
    textAlign: 'justify',
    marginBottom: 20,
    marginHorizontal: 10

  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: '#f25570',
  },
  favouriteStyle: {
    fontSize: 30,
    color: '#f25570',
  },
  arrowLeft: {
    fontSize: 30,
    color: 'white',
  },
});

export default ProductDetailScreen;
