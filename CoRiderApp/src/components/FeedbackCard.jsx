import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
    <Path d="M22 2 11 13" />
    <Path d="M22 2 15 22 11 13 2 9 22 2Z" />
  </Svg>
);

export default function FeedbackCard({ feedback, setFeedback, onSend }) {
  const inputMarginTop = 20;

  return (
    <StyledView className="w-[295px] h-[240px] rounded-[20px] overflow-hidden shadow-lg">
      <LinearGradient
        colors={['#FF3131', '#FF914D']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />

      <StyledView className="flex-1 p-[13px]">
        <StyledView className="flex-row justify-between items-center">
          <StyledText
            className="text-[16px] text-[#FDFDFD] font-semibold"
            style={{ lineHeight: 24, fontFamily: 'Poppins-SemiBold' }}
          >
            Give us your Feedback
          </StyledText>

          <StyledTouchableOpacity
            onPress={() => onSend(feedback)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="Send feedback"
          >
            <SendIcon />
          </StyledTouchableOpacity>
        </StyledView>

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
          value={feedback}
          onChangeText={setFeedback}
          multiline={true}
        />
      </StyledView>
    </StyledView>
  );
}
