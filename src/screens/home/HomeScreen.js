import {
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/header/Header';
import {scale} from '../../constants';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    // height: scale(100),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  body: {},
  bottomContainer: {},
});
