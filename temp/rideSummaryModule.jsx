import React from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

// This is required for NativeWind to work
NativeWindStyleSheet.setOutput({
  default: "native",
});

/**
 * RideSummaryModule Component
 * * This component recreates the ride summary UI element for React Native.
 * It uses NativeWind (Tailwind CSS for React Native) for styling.
 */
function RideSummaryModule() {
  return (
    // Note: React Native shadows (shadow-xl) work differently and are
    // more subtle. 'shadow-xl' in NativeWind provides a good default.
    // Elevation can be used for Android shadow: className="elevation-5"
    <View className="font-poppins bg-white rounded-full shadow-xl flex flex-row items-center justify-between w-80 px-8 py-4 m-4">
      {/* Left Text: Placeholder for Date & Time */}
      <Text className="text-gray-400 text-lg font-medium font-poppins">
        Date | Time
      </Text>
      
      {/* Right Text: Placeholder for Amount */}
      <Text className="text-black text-3xl font-bold font-poppins">
        ₹0.00
      </Text>
    </View>
  );
}

/**
 * Main App Component
 * * This is the root component that renders the RideSummaryModule
 * and centers it on the screen for previewing.
 * * Uses SafeAreaView for proper spacing on iOS devices.
 */
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-300">
      <StatusBar barStyle="dark-content" />
      <RideSummaryModule />
    </SafeAreaView>
  );
}
