// src/App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideDetailsScreen from './screens/RideDetailsScreen';
import RatingScreen from './screens/RatingScreen';
import SupportScreen from './screens/SupportScreen';
import { socket } from './socket'; // ensures socket connects once globally

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RideDetails"
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerStyle: { backgroundColor: '#FFF' },
        }}
      >
        <Stack.Screen
          name="RideDetails"
          component={RideDetailsScreen}
          options={{ title: 'Ride Details' }}
        />
        <Stack.Screen
          name="Rating"
          component={RatingScreen}
          options={{ title: 'Rate Your Ride' }}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{ title: 'Support' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
