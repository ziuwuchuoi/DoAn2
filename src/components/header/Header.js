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
import {FONT_FAMILY, scale} from '../../constants';
import {IC_Back} from '../../assets/icons';

const {width, height} = Dimensions.get('window');

const Header = props => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={props.onBack}>
          <IC_Back style={{width: 100, height: 100}}></IC_Back>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.aboutContainer}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(70),
    flexDirection: 'row',
    display: 'flex',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    alignSelf: 'center',
    marginBottom: 10,
    color: '#020843',
    fontFamily: FONT_FAMILY.AbhayaExtraBold,
    marginTop: 10,
  },
  aboutContainer: {flex: 1, backgroundColor: 'white'},
});
