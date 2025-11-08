import React from 'react';
import { View, Text } from 'react-native';

/**
 * RideSummaryModule Component
 * Shows the date/time and ride amount in a clean summary bubble.
 * Accepts props so you can pass backend data dynamically.
 *
 * @param {string} dateTime - Formatted date/time string
 * @param {number} amount - Fare amount (in ₹)
 */
export default function RideSummaryModule({ dateTime, amount }) {
  const formattedAmount = amount ? `₹${amount.toFixed(2)}` : '₹0.00';

  return (
    <View className="font-poppins bg-white rounded-full shadow-xl flex flex-row items-center justify-between w-80 px-8 py-4 m-4">
      {/* Left Text: Date & Time */}
      <Text className="text-gray-400 text-lg font-medium font-poppins">
        {dateTime || 'Date | Time'}
      </Text>

      {/* Right Text: Fare */}
      <Text className="text-black text-3xl font-bold font-poppins">
        {formattedAmount}
      </Text>
    </View>
  );
}
