import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import SegmentScreen from '../screens/segment/SegmentScreen';
import ResultScreen from '../screens/result/ResultScreen';
import BottomTabs from './bottomTab';
import Header from '../components/header/Header';
import PredictScreen from '../screens/predict/PredictScreen';
import LoadingScreen from '../screens/loading/LoadingScreen';
//import {useNavigation} from '@react-navigation/native';

const AppStack = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Loading" options={{headerShown: false}}>
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Predict"
        component={PredictScreen}
        options={{
          header: () => (
            <Header
              onBack={() => navigation.navigate('Detect')}
              title={'RESULT'}></Header>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
