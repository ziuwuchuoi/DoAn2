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
import {FONT_FAMILY} from '../../constants';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          height: 'auto',
        }}>
        <Image source={IMG_Moon} style={styles.img}></Image>
        <Image source={IMG_Home} style={styles.image}></Image>
      </View>
      <View
        style={{
          top: 130,
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.text}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.AbhayaBold,
            }}>
            BRAUINT
          </Text>{' '}
          is an application that allows user to scan brain tumor CT image and
          then predict whether that tumor is{' '}
          <Text
            style={{
              fontFamily: FONT_FAMILY.AbhayaExtraBold,
              color: '#1C871A',
            }}>
            positive
          </Text>{' '}
          or{' '}
          <Text
            style={{
              fontFamily: FONT_FAMILY.AbhayaBold,
              color: '#CE1818',
            }}>
            negative
          </Text>
          .
        </Text>
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
  text: {
    fontFamily: FONT_FAMILY.AbhayaMedium,
    fontSize: 20,
    textAlign: 'justify',
    color: '#020843',
  },
});
