import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
// Make sure to install this library: npm install react-native-linear-gradient
import LinearGradient from 'react-native-linear-gradient';

/**
 * This is the React Native component.
 * NOTE: This will not work in the web preview.
 * It's built with nativewind and includes all your requested changes.
 */
const PointModule = () => {
  
  // Style object for the Poppins font.
  // This assumes the font 'Poppins' is linked in your native project.
  // The 'font-medium' class from nativewind will select the medium weight.
  const poppinsFont = { fontFamily: 'Poppins' };

  return (
    <View 
      className="w-[290px] h-[108px] bg-[#F8F8FF] p-4 flex flex-col justify-between rounded-lg shadow-md"
    >
      
      {/* Top Section: Total Time */}
      <View>
        <Text style={poppinsFont} className="text-center text-black text-sm font-medium">
          Total time: 00:00
        </Text>
      </View>
      
      {/* Middle Section: Gradient Bar and Points */}
      <View className="flex-row items-center">
        {/* Start Circle (Point A) */}
        <View className="w-5 h-5 rounded-full bg-white flex items-center justify-center border-4 border-[#03FF5F]" />
        
        {/* Gradient Line */}
        <LinearGradient 
          colors={['#03FF5F', '#00C3FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-1.5 flex-1"
        />
        
        {/* End Circle (Point B) */}
        <View className="w-5 h-5 rounded-full bg-white flex items-center justify-center border-4 border-[#00C3FF]" />
      </View>
      
      {/* Bottom Section: Point Labels and Times */}
      <View className="flex-row justify-between">
        
        {/* Point A */}
        <View className="flex-col items-center">
          <Text style={poppinsFont} className="text-black text-sm font-medium">Point A</Text>
          <Text style={poppinsFont} className="text-black text-sm font-medium">00:00</Text>
        </View>

        {/* Point B */}
        <View className="flex-col items-center">
          <Text style={poppinsFont} className="text-black text-sm font-medium">Point B</Text>
          <Text style={poppinsFont} className="text-black text-sm font-medium">00:00</Text>
        </View>

      </View>
    </View>
  );
};

// This is a simple App container to display your component
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-300">
      <PointModule />
    </SafeAreaView>
  );
}

