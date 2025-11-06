import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform, // Import Platform
} from 'react-native';
import { Star } from 'lucide-react-native';

// --- StarButton Component (React Native) ---
// This is a separate component to manage its own animation state
// for the "pop" effect on press.

const StarButton = ({ filled, onPress }) => {
  // We use useRef to keep the Animated.Value persistent
  // across re-renders without triggering them.
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // This function handles both the parent's onPress (setting the rating)
  // and triggering the local animation.
  const handlePress = () => {
    // Call the onPress function passed from the parent
    onPress();

    // Trigger the "pop" animation
    // 1. Instantly scale up (we use setValue for an instant change)
    scaleAnim.setValue(1.3);

    // 2. Spring back down to 1
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3, // Adds a bit of bounciness
      useNativeDriver: true, // Improves performance
    }).start();
  };

  return (
    // We use TouchableOpacity for a standard press feedback
    // and to capture the onPress event.
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      {/*
        This Animated.View handles the animation.
        - We apply the scale transform from our animated value.
        - 'mx-1.5' is a NativeWind class for horizontal margin.
      */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
        className="mx-1.5"
      >
        <Star
          // The size is 44px, matching the original.
          size={44}
          // Use the Figma colors for filled and unfilled states.
          // In lucide-react-native, 'fill' controls the inside color.
          color={filled ? '#FFCE1C' : '#ECECEC'}
          fill={filled ? '#FFCE1C' : '#ECECEC'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

// --- Main Rating Module Component (React Native) ---
// This is the component from your image, rebuilt for React Native.

const RatingModule = () => {
  // 'rating' state holds the currently selected star rating.
  // We default it to 4 as shown in the image.
  const [rating, setRating] = useState(4);

  return (
    // <View> is the React Native equivalent of <div>.
    // 'items-center' centers children horizontally in a flex column.
    <View className="w-[290px] h-[108px] items-center">
      {/*
        "Your Rating" Text
        - <Text> is required for all text in React Native.
        - 'font-bold' is applied as requested.
        - 'leading-[45px]' sets a fixed line height.
      */}
      <Text
        className="text-3xl font-bold text-[#282828] leading-[45px]"
        // To use Poppins, you must load the font into your
        // native project's assets (e.g., in /assets/fonts)
        // and then reference it by its PostScript name.
        style={{
          fontFamily: Platform.OS === 'ios' ? 'Poppins-Bold' : 'Poppins-Bold',
        }}
      >
        Your Rating
      </Text>

      {/*
        Stars Container
        - 'flex-row' arranges children in a horizontal line.
        - 'justify-center' centers them within the container.
      */}
      <View className="flex-row justify-center mt-2">
        {/*
          We create an array of 5 items and map over it
          to render 5 StarButton components.
        */}
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <StarButton
              key={index}
              // 'filled' is true if the star's value is
              // less than or equal to the current rating.
              filled={starValue <= rating}
              // Pass a function to set the rating to this star's value.
              onPress={() => setRating(starValue)}
            />
          );
        })}
      </View>
    </View>
  );
};

// --- App Component (Main Export) ---
// This wraps the RatingModule to center it on the screen for a nice preview.
export default function App() {
  return (
    // SafeAreaView ensures content doesn't overlap with device notches.
    // 'flex-1' makes it fill the whole screen.
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      {/* StatusBar controls the color of the system time, battery, etc. */}
      <StatusBar barStyle="dark-content" />
      <RatingModule />
    </SafeAreaView>
  );
}

