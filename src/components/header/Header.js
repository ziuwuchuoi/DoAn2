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
import React from 'react';
import {scale} from '../../constants';

const {width, height} = Dimensions.get('window');

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}></View>
      <View style={styles.logoContainer}></View>
      <View style={styles.aboutContainer}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(80),
    backgroundColor: 'yellow',
    flexDirection: 'row',
    display: 'flex',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  logoContainer: {flex: 3, backgroundColor: 'green'},
  aboutContainer: {flex: 1, backgroundColor: 'blue'},
});
