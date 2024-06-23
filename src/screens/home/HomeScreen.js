import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {IMG_Home, IMG_Moon} from '../../assets/images';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image source={IMG_Moon} style={styles.img}></Image>
        <Image source={IMG_Home} style={styles.image}></Image>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: 300,
    resizeMode: 'cover',
  },
  image: {
    width: 300,
    height: 300,
    position: 'absolute',
    resizeMode: 'cover',
    top: 100,
    alignSelf: 'center',
  },
});
