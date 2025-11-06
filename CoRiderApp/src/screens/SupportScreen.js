import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

export default function SupportScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold mb-3">Need Help?</Text>
      <TouchableOpacity onPress={() => Linking.openURL('tel:+911234567890')}>
        <Text className="text-blue-500 underline text-lg">Call Support</Text>
      </TouchableOpacity>
    </View>
  );
}
