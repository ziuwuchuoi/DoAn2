import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import Header from '../components/header/Header';
import DetectScreen from '../screens/detect/DetectScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import {IC_Home, IC_Brain, IC_History} from '../assets/icons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#020843',
          height: 70,
          borderTopWidth: 0,
          position: 'absolute',
          borderRadius: 25,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconColor;

          if (focused) {
            iconColor = '#00E0FF';
          } else {
            iconColor = 'white';
          }

          if (route.name === 'Home') {
            iconName = focused ? (
              <IC_Home color={iconColor} />
            ) : (
              <IC_Home color={iconColor} />
            );
          } else if (route.name === 'Detect') {
            iconName = focused ? (
              <IC_Brain color={iconColor} />
            ) : (
              <IC_Brain color={iconColor} />
            );
          } else if (route.name === 'History') {
            iconName = focused ? (
              <IC_History color={iconColor} />
            ) : (
              <IC_History color={iconColor} />
            );
          }

          return <View style={styles.tab}>{iconName}</View>;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Detect"
        component={DetectScreen}
        options={{
          header: () => <Header title={'PREDICT'} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          header: () => <Header title={'HISTORY'} />,
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
