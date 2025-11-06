import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { styled } from 'nativewind';

// Style the LinearGradient component so it can accept Tailwind classes
const StyledGradient = styled(LinearGradient);

/**
 * Note on Fonts:
 * To use the 'Poppins' font, you must:
 * 1. Add the Poppins font files (e.g., .ttf) to your project's assets (e.g., ./assets/fonts)
 * 2. Run `npx react-native-asset` to link them.
 * 3. Add a 'fontFamily' utility to your `tailwind.config.js`:
 * theme: {
 * extend: {
 * fontFamily: {
 * poppins: ['Poppins-Regular'],
 * 'poppins-semibold': ['Poppins-SemiBold'],
 * 'poppins-medium': ['Poppins-Medium'], // For "Waiting For Rider..."
 * },
 * },
 * },
 * 4. You could then use classes like `font-poppins` and `font-poppins-semibold`.
 *
 * For this example, we'll use Tailwind's default `font-normal`, `font-semibold`, `font-medium`
 * and apply Poppins via the style prop as a fallback.
 */

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [pickerTextColor, setPickerTextColor] = useState('#969696');

  const paymentOptions = [
    { label: 'Phone Pe', value: 'Phone Pe' },
    { label: 'Google Pay', value: 'Google Pay' },
    { label: 'Paytm', value: 'Paytm' },
    { label: 'Other UPI', value: 'Other UPI' },
  ];

  const handlePaymentReceived = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('No Payment Method', 'Please select a payment method first.');
      return;
    }

    console.log('Payment Received via:', selectedPaymentMethod);
    Alert.alert(
      'Payment Confirmed',
      `Payment received via ${selectedPaymentMethod}.`,
    );

    setSelectedPaymentMethod(null);
    setPickerTextColor('#969696');
  };

  const handleReport = () => {
    Alert.alert('Report Issue', 'Reporting a payment issue.');
    // Implement actual reporting logic here
  };

  const handleSupport = () => {
    Alert.alert('Contact Support', 'Opening support chat/page.');
    // Implement actual support logic here
  };

  // Styles for Poppins font (replace with Tailwind classes if configured)
  const styles = StyleSheet.create({
    poppinsRegular: {
      fontFamily: 'Poppins-Regular', // Use the name you linked
    },
    poppinsMedium: {
      fontFamily: 'Poppins-Medium', // Use the name you linked
    },
    poppinsSemibold: {
      fontFamily: 'Poppins-SemiBold', // Use the name you linked
    },
    pickerPlaceholder: {
      color: '#969696',
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      lineHeight: 21,
    },
    pickerItem: {
      color: '#FFFFFF', // Color for items in the dropdown list
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      lineHeight: 21,
    },
    // Specific styles for "₹0.00" text
    rupeeAmount: {
      fontFamily: 'Poppins-Semibold',
      fontSize: 40,
      lineHeight: 40, // Adjust line height to prevent clipping
      color: '#4D47C6', // Specific color from mockup
      marginTop: 20, // Adjusted to match mockup spacing
    },
  });

  return (
    // Main container (white rounded square from mockup)
    <View className="flex-1 items-center justify-center bg-zinc-900 p-4">
      <View className="w-[330px] bg-white rounded-[20px] items-center px-4 py-8 shadow-lg">
        {/* Payment Title */}
        <Text className="text-black text-[24px] font-semibold mb-4">
          Payment
        </Text>

        {/* Rupee Amount */}
        <Text style={styles.rupeeAmount}>₹0.00</Text>

        {/* Waiting For Rider... */}
        <Text
          className="text-[#969696] text-[16px] font-medium mt-4 mb-8"
          style={styles.poppinsMedium}
        >
          Waiting For Rider...
        </Text>

        {/* Payment Method Picker Container */}
        <View className="w-[237px] h-[34px] rounded-full border border-[#969696] bg-transparent justify-center overflow-hidden mb-3">
          <Picker
            selectedValue={selectedPaymentMethod}
            onValueChange={(itemValue) => {
              setSelectedPaymentMethod(itemValue);
              setPickerTextColor(itemValue ? '#000000' : '#969696'); // Text black when selected
            }}
            style={{
              width: '100%',
              height: '100%',
              color: pickerTextColor,
              backgroundColor: 'transparent',
              ...Platform.select({
                android: { marginLeft: 15 },
                ios: {},
              }),
            }}
            dropdownIconColor="#969696"
            prompt="Select a Payment Method"
          >
            <Picker.Item
              label="Payment Method"
              value={null}
              style={styles.pickerPlaceholder}
            />
            {paymentOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={styles.pickerItem}
              />
            ))}
          </Picker>
        </View>

        {/* Payment Received Button */}
        <TouchableOpacity onPress={handlePaymentReceived} className="mb-8">
          <StyledGradient
            colors={['#FF3131', '#FF914D']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className="w-[237px] h-[32px] rounded-full items-center justify-center"
          >
            <Text
              style={styles.poppinsSemibold}
              className="text-[#FDFDFD] text-[15px] font-semibold"
            >
              Payment Received
            </Text>
          </StyledGradient>
        </TouchableOpacity>

        {/* Report and Support Buttons */}
        <View className="flex-row w-[237px] justify-between">
          <TouchableOpacity
            onPress={handleReport}
            className="bg-[#FF3131] w-[110px] h-[32px] rounded-full items-center justify-center"
          >
            <Text
              style={styles.poppinsSemibold}
              className="text-white text-[15px] font-semibold"
            >
              Report
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSupport}
            className="bg-[#00B0FF] w-[110px] h-[32px] rounded-full items-center justify-center"
          >
            <Text
              style={styles.poppinsSemibold}
              className="text-white text-[15px] font-semibold"
            >
              Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;