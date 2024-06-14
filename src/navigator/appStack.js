import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import SegmentScreen from '../screens/segment/SegmentScreen';
import BottomTabs from './bottomTab';

const AppStack = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        screenOptions={{headerShown: false}}
      />
      <Stack.Screen
        name="Segment"
        component={SegmentScreen}
        screenOptions={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
