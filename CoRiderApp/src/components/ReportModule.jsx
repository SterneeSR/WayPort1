import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API } from '../config'; // <-- import your backend URLs

// Common queries to display
const reportQueries = [
  "Ride not starting",
  "Payment issue",
  "App crash or freeze",
  "Location not updating",
  "Rider was rude",
  "Wrong fare shown",
  "Late arrival",
  "Other issue",
];

export default function ReportComponent({ userId, rideId }) {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectQuery = (query) => {
    setSelectedQuery(query);
    setCustomMessage('');
  };

  const handleCustomMessageChange = (text) => {
    setCustomMessage(text);
    setSelectedQuery(null);
  };

  const handleSubmit = async () => {
    const category = selectedQuery || 'Other';
    const message = customMessage || selectedQuery;

    if (!message?.trim()) {
      Alert.alert('Missing Input', 'Please select a query or type your report.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(API.REPORTS, {
        user_id: userId,
        ride_id: rideId,
        category,
        message,
      });

      Alert.alert('✅ Report Submitted', 'Your report has been sent successfully.');
      setSelectedQuery(null);
      setCustomMessage('');
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Failed', 'Could not submit report. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingVertical: 40,
        }}
        className="p-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full bg-white rounded-[40px] p-6 shadow-lg">
          <Text className="text-4xl font-poppins-bold text-black mb-6">
            Report an Issue
          </Text>

          {reportQueries.map((query) => (
            <TouchableOpacity
              key={query}
              onPress={() => handleSelectQuery(query)}
              activeOpacity={0.7}
              className={`w-full h-12 border rounded-xl px-4 justify-center mb-3 
                ${selectedQuery === query
                  ? 'border-red-500 border-2 bg-red-50'
                  : 'border-gray-300 bg-white'
                }`}
            >
              <Text
                className={`text-base font-poppins
                  ${selectedQuery === query
                    ? 'text-red-600 font-poppins-medium'
                    : 'text-gray-400'
                  }`}
              >
                {query}
              </Text>
            </TouchableOpacity>
          ))}

          <TextInput
            placeholder="Other (Type your report)"
            placeholderTextColor="#B0B0B0"
            value={customMessage}
            onChangeText={handleCustomMessageChange}
            className="w-full h-12 bg-white border-2 border-red-500 rounded-xl px-4 text-base font-poppins mb-6 mt-3"
          />

          <TouchableOpacity
            className="w-full rounded-full"
            activeOpacity={0.8}
            onPress={handleSubmit}
            disabled={loading}
          >
            <LinearGradient
              colors={['#FF6A4D', '#FF914D']}
              className={`w-full h-14 rounded-full items-center justify-center ${loading ? 'opacity-50' : ''}`}
            >
              <Text className="text-white text-lg font-poppins-semibold">
                {loading ? 'Submitting...' : 'Submit Report'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
