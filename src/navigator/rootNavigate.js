import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppStack from './appStack';
import BottomTabs from './bottomTab';

const RootNavigate = () => {
  return (
    <NavigationContainer>
      {/* <BottomTabs></BottomTabs> */}
      <AppStack></AppStack>
    </NavigationContainer>
  );
};

export default RootNavigate;

const styles = StyleSheet.create({});
