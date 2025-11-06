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
 * },
 * },
 * },
 * 4. You could then use classes like `font-poppins` and `font-poppins-semibold`.
 *
 * For this example, we'll use Tailwind's default `font-normal` and `font-semibold`
 * and apply Poppins via the style prop as a fallback.
 */

const PaymentComponent = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // State to control the picker's text color (placeholder vs. selected value)
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

    // This is the "open-end response"
    console.log('Payment Received via:', selectedPaymentMethod);
    Alert.alert(
      'Payment Confirmed',
      `Payment received via ${selectedPaymentMethod}.`,
    );

    // Reset the screen state
    setSelectedPaymentMethod(null);
    setPickerTextColor('#969696');
  };

  // Styles for Poppins font (replace with Tailwind classes if configured)
  const styles = StyleSheet.create({
    poppinsRegular: {
      fontFamily: 'Poppins-Regular', // Use the name you linked
      fontSize: 14,
      lineHeight: 21,
    },
    poppinsSemibold: {
      fontFamily: 'Poppins-SemiBold', // Use the name you linked
      fontSize: 15,
      lineHeight: 22,
      color: '#FDFDFD',
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
  });

  return (
    // Main container, centered for demonstration
    <View className="flex-1 items-center justify-center bg-zinc-900 p-4">
      {/* Payment Method Picker Container */}
      {/* This View replicates the border, background, and shape from the image. */}
      <View className="w-[237px] h-[34px] rounded-full border border-[#969696] bg-black justify-center overflow-hidden">
        <Picker
          selectedValue={selectedPaymentMethod}
          onValueChange={(itemValue) => {
            setSelectedPaymentMethod(itemValue);
            // Set color to white when a value is selected, gray when placeholder is showing
            setPickerTextColor(itemValue ? '#FFFFFF' : '#969696');
          }}
          // Style the picker itself. Note: This is platform-specific.
          style={{
            width: '100%',
            height: '100%',
            color: pickerTextColor,
            backgroundColor: 'transparent', // Ensure container bg shows
            ...Platform.select({
              android: {
                // On Android, we move the text slightly to center it better
                // as it tends to align left by default inside the container.
                marginLeft: 15,
              },
              ios: {
                // On iOS, the picker item text is centered by default.
              },
            }),
          }}
          dropdownIconColor="#969696"
          prompt="Select a Payment Method"
        >
          {/* Placeholder Item */}
          <Picker.Item
            label="Payment Method"
            value={null}
            style={styles.pickerPlaceholder}
          />

          {/* Payment Options */}
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
      {/* The spacing `mt-1.5` (6px) is derived from Figma CSS: 
          Button top (620px) - (Box top (581px) + Box height (34px)) = 5px. mt-1.5 is the closest. */}
      <TouchableOpacity onPress={handlePaymentReceived} className="mt-1.5">
        <StyledGradient
          colors={['#FF3131', '#FF914D']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          // Pixel-perfect sizing and styling from Figma specs
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
    </View>
  );
};

export default PaymentComponent;