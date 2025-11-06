import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Platform } from 'react-native';
import { Star } from 'lucide-react-native';

const StarButton = ({ filled, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePress = () => {
    onPress();
    scaleAnim.setValue(1.3);
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }} className="mx-1.5">
        <Star size={44} color={filled ? '#FFCE1C' : '#ECECEC'} fill={filled ? '#FFCE1C' : '#ECECEC'} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function RatingModule({ rating, setRating }) {
  return (
    <View className="w-[290px] h-[108px] items-center">
      <Text
        className="text-3xl font-bold text-[#282828] leading-[45px]"
        style={{ fontFamily: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins-Bold' }}
      >
        Your Rating
      </Text>

      <View className="flex-row justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <StarButton key={i} filled={i + 1 <= rating} onPress={() => setRating(i + 1)} />
        ))}
      </View>
    </View>
  );
}
