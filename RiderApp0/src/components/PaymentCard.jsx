import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { styled } from 'nativewind';

const StyledGradient = styled(LinearGradient);

export default function PaymentCard({ amount, onConfirm, onReport, onSupport }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [pickerTextColor, setPickerTextColor] = useState('#969696');

  const paymentOptions = [
    { label: 'PhonePe', value: 'PhonePe' },
    { label: 'Google Pay', value: 'Google Pay' },
    { label: 'Paytm', value: 'Paytm' },
    { label: 'Other UPI', value: 'Other UPI' },
  ];

  const handleConfirm = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Please select a payment method');
      return;
    }
    onConfirm(selectedPaymentMethod);
  };

  const styles = StyleSheet.create({
    rupeeAmount: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 40,
      color: '#4D47C6',
      marginTop: 20,
    },
  });

  return (
    <View className="w-[330px] bg-white rounded-[20px] items-center px-4 py-8 shadow-lg">
      <Text className="text-black text-[24px] font-semibold mb-4">Payment</Text>
      <Text style={styles.rupeeAmount}>₹{amount?.toFixed(2) || '0.00'}</Text>

      <Text className="text-[#969696] text-[16px] font-medium mt-4 mb-8">
        Waiting For Rider...
      </Text>

      <View className="w-[237px] h-[34px] rounded-full border border-[#969696] bg-transparent justify-center overflow-hidden mb-3">
        <Picker
          selectedValue={selectedPaymentMethod}
          onValueChange={(itemValue) => {
            setSelectedPaymentMethod(itemValue);
            setPickerTextColor(itemValue ? '#000000' : '#969696');
          }}
          style={{
            width: '100%',
            height: '100%',
            color: pickerTextColor,
            backgroundColor: 'transparent',
            ...Platform.select({ android: { marginLeft: 15 } }),
          }}
          dropdownIconColor="#969696"
          prompt="Select a Payment Method"
        >
          <Picker.Item label="Payment Method" value={null} />
          {paymentOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity onPress={handleConfirm} className="mb-8">
        <StyledGradient
          colors={['#FF3131', '#FF914D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="w-[237px] h-[32px] rounded-full items-center justify-center"
        >
          <Text className="text-[#FDFDFD] text-[15px] font-semibold">
            Payment Received
          </Text>
        </StyledGradient>
      </TouchableOpacity>

      <View className="flex-row w-[237px] justify-between">
        <TouchableOpacity
          onPress={onReport}
          className="bg-[#FF3131] w-[110px] h-[32px] rounded-full items-center justify-center"
        >
          <Text className="text-white text-[15px] font-semibold">Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSupport}
          className="bg-[#00B0FF] w-[110px] h-[32px] rounded-full items-center justify-center"
        >
          <Text className="text-white text-[15px] font-semibold">Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
