import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { styled } from 'nativewind';

// Styled components for nativewind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

/**
 * A custom Send Icon component (react-native-svg).
 * The icon is an outline paper plane, matching the Figma design.
 */
const SendIcon = ({ color = '#FDFDFD', width = 24, height = 24 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* This path creates the paper plane outline */}
    <Path d="M22 2 11 13" />
    <Path d="M22 2 15 22 11 13 2 9 22 2Z" />
  </Svg>
);

/**
 * FeedbackCard Component (React Native Version)
 *
 * This component renders a feedback card based on the provided
 * Figma design, adapted for React Native with nativewind.
 *
 * NOTE: This component assumes you have the 'Poppins' font family
 * configured in your React Native project.
 */
export default function FeedbackCard() {
  // State to hold the user's message
  const [message, setMessage] = useState('');

  // Function to handle sending the feedback
  const handleSend = () => {
    // In a real app, you would send this to a server.
    console.log('Feedback sent:', message);
    
    // Clear the input field
    setMessage('');
  };

  // --- Dimension constants from our last web version ---
  const inputMarginTop = 20;

  return (
    // Main container (Group 4)
    // w: 295px, h: 240px, border-radius: 20px
    <StyledView
      className="w-[295px] h-[240px] rounded-[20px] overflow-hidden shadow-lg"
      // Apply Poppins font family via style prop if not in Tailwind config
      style={{ fontFamily: 'Poppins-SemiBold' }} // Example font name
    >
      {/* Background Gradient (Union) */}
      <LinearGradient
        colors={['#FF3131', '#FF914D']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Content Container */}
      {/* Using p-[13px] for even padding */}
      <StyledView className="flex-1 p-[13px]">
        {/* Header Row: Title + Send Button */}
        <StyledView className="flex-row justify-between items-center">
          {/* Title (Give us your Feedback) */}
          <StyledText
            className="text-[16px] text-[#FDFDFD] font-semibold"
            style={{
              lineHeight: 24, // Apply specific line-height
              fontFamily: 'Poppins-SemiBold', // Ensure font weight is correct
            }}
          >
            Give us your Feedback
          </StyledText>

          {/* Send Button (send) */}
          <StyledTouchableOpacity
            onPress={handleSend}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="Send feedback"
          >
            {/* Icon (icon) */}
            <SendIcon />
          </StyledTouchableOpacity>
        </StyledView>

        {/* Text Input (Type your message) */}
        <StyledTextInput
          className="flex-1 text-[15px] text-black font-medium bg-white w-full p-2 rounded-md"
          style={{
            marginTop: inputMarginTop,
            lineHeight: 22,
            fontFamily: 'Poppins-Medium', 
            textAlignVertical: 'top',
          }}
          placeholder="Type your message"
          placeholderTextColor="#969696"
          value={message}
          onChangeText={setMessage}
          multiline={true} // Use multiline for a textarea-like input
        />
      </StyledView>
    </StyledView>
  );
}

