// src/screens/PaymentScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { API } from '../config';

export default function PaymentScreen({ route, navigation }) {
  const { ride_id, payer_id, payee_id, amount } = route.params;
  const [method, setMethod] = useState('Cash');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const handlePaymentReceived = async () => {
    if (!selectedPaymentMethod) {
        Alert.alert('No Payment Method', 'Please select a payment method first.');
        return;
    }

    try {
        const res = await axios.post(API.PAYMENTS, {
            ride_id: 1,        // dynamic in full app
            payer_id: 2,
            payee_id: 1,
            amount: 100,       // get dynamically
            payment_method: selectedPaymentMethod,
            status: 'Success',
        });

        console.log('Payment success:', res.data);
            Alert.alert('Payment Confirmed', `Received via ${selectedPaymentMethod}`);
        } catch (err) {
        console.error(err);
            Alert.alert('Error', 'Payment failed. Try again.');
        }

    setSelectedPaymentMethod(null);
    setPickerTextColor('#969696');
    };
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-6">Payment</Text>
      <Text className="text-lg mb-2">Select Payment Method:</Text>

      {['Cash', 'UPI', 'Paytm', 'PhonePe', 'Google Pay'].map((m) => (
        <TouchableOpacity
          key={m}
          className={`border rounded-full px-6 py-2 m-2 ${
            method === m ? 'bg-orange-400' : 'bg-gray-100'
          }`}
          onPress={() => setMethod(m)}
        >
          <Text className="text-lg">{m}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={loading}
        onPress={handlePayment}
        className="bg-green-500 px-8 py-3 mt-6 rounded-full"
      >
        <Text className="text-white text-lg">
          {loading ? 'Processing...' : 'Payment Received'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
 