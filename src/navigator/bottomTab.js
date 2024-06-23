import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {scale} from '../../constants';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IC_Brain, IC_History, IC_Home} from '../assets/icons';
import HomeScreen from '../screens/home/HomeScreen';
import Header from '../components/header/Header';
import DetectScreen from '../screens/detect/DetectScreen';
import HistoryScreen from '../screens/history/HistoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#020843',
          zIndex: 0,
          elevation: 0,
          height: 70,
          borderTopWidth: 0,
          position: 'absolute',
          borderRadius: 25,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={styles.tab}>
              <IC_Home color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Detect"
        component={DetectScreen}
        options={{
          header: () => <Header title={'PREDICT'}></Header>,
          tabBarIcon: ({color, size}) => (
            <View style={styles.tab}>
              <IC_Brain color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          header: () => <Header title={'HISTORY'}></Header>,
          tabBarIcon: ({color, size}) => (
            <View style={styles.tab}>
              <IC_History color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
