import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function PointModule({ start, end, totalTime }) {
  return (
    <View className="w-[290px] h-[108px] bg-[#F8F8FF] p-4 flex flex-col justify-between rounded-lg shadow-md">
      <View>
        <Text className="text-center text-black text-sm font-medium">
          Total time: {totalTime || '00:00'}
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="w-5 h-5 rounded-full bg-white border-4 border-[#03FF5F]" />
        <LinearGradient
          colors={['#03FF5F', '#00C3FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-1.5 flex-1"
        />
        <View className="w-5 h-5 rounded-full bg-white border-4 border-[#00C3FF]" />
      </View>

      <View className="flex-row justify-between">
        <View className="flex-col items-center">
          <Text className="text-black text-sm font-medium">{start}</Text>
          <Text className="text-black text-sm font-medium">00:00</Text>
        </View>
        <View className="flex-col items-center">
          <Text className="text-black text-sm font-medium">{end}</Text>
          <Text className="text-black text-sm font-medium">00:00</Text>
        </View>
      </View>
    </View>
  );
}
