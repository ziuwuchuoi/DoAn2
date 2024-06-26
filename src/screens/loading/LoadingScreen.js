import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {IMG_Loading} from '../../assets/images';
import {FONT_FAMILY} from '../../constants';

class LoadingScreen extends Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('BottomTabs');
    }, 5000);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.img}>
            <Image source={IMG_Loading}></Image>
            <Text style={styles.text}>WELCOME TO BRAUINT</Text>
          </View>
        </View>
        <View>
          <Text style={styles.sub}>@2024 - Developed by Nhat Vy</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020843',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontSize: 40,
    fontFamily: FONT_FAMILY.AbhayaExtraBold,
    color: 'white',
    textAlign: 'center',
    marginTop: 40,
  },
  sub: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.AbhayaRegular,
    color: 'white',
    textAlign: 'center',
  },
});
