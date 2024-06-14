import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import BottomTabs from './bottomTab';

const Stack = createNativeStackNavigator();
const RootNavigate = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator> */}
      <BottomTabs></BottomTabs>
    </NavigationContainer>
  );
};

export default RootNavigate;

const styles = StyleSheet.create({});
