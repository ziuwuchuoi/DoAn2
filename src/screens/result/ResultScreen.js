import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ResultScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>RESULT</Text>
        <View style={styles.frame}></View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: 'rgba(227, 223, 205, 0.26)'},
            ]}>
            <Text style={[styles.label, {color: '#020843'}]}>SHARE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#020843'}]}>
            <Text style={[styles.label, {color: '#ffff'}]}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    color: '#020843',
  },
  bodyContainer: {
    width: '95%',
    height: 'auto',
  },
  frame: {
    width: '100%',
    height: 300,
    backgroundColor: '#020843',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    height: 45,
    opacity: '26%',
    borderRadius: 30,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
  },
  label: {
    fontSize: 18,
  },
});
