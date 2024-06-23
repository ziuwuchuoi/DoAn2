import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HistoryScreen = () => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
