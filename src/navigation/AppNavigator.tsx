import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CaptureScreen from '../screens/CaptureScreen';

export type RootStackParamList = {
  Home: undefined;
  Capture: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Capture" component={CaptureScreen} options={{ title: 'Capture' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}