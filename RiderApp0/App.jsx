// src/App.jsx
import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RideDetailsScreen from './src/screens/RideDetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SupportScreen from './src/screens/SupportScreen';
import { socket } from './socket';

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
          name="Payment"
          component={PaymentScreen}
          options={{ title: 'Payment Confirmation' }}
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
