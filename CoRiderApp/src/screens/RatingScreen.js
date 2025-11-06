import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';
import { API } from '../config';
import RatingModule from '../components/ratingModule';
import FeedbackCard from '../components/feedback';

export default function RatingScreen({ route }) {
  const { ride_id, rater_id, ratee_id } = route.params;
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(API.RATINGS, {
        ride_id,
        rater_id,
        ratee_id,
        rating_value: rating,
        feedback_text: feedback,
      });
      Alert.alert('Feedback Submitted', 'Thank you for your rating!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Unable to submit feedback.');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <RatingModule rating={rating} setRating={setRating} />
      <FeedbackCard feedback={feedback} setFeedback={setFeedback} />
      <Button title="Send Feedback" onPress={handleSubmit} />
    </View>
  );
}
