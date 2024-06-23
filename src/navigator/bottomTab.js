import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {scale} from '../../constants';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IC_Heart, IC_Home, IC_Segment} from '../assets/icons';
import HomeScreen from '../screens/home/HomeScreen';
import SegmentScreen from '../screens/segment/SegmentScreen';
import NotKnow from '../screens/notknow/NotKnow';
import Header from '../components/header/Header';
import DetectScreen from '../screens/detect/DetectScreen';

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
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={styles.tab}>
              <IC_Segment color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NotKnow"
        component={NotKnow}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <View style={styles.tab}>
              <IC_Heart color={color} size={size} />
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
