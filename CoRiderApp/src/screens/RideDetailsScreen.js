import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { socket } from '../socket';
import PointModule from '../components/PointModule';
import RideSummaryModule from '../components/rideSummaryModule';

export default function RideDetailsScreen({ navigation }) {
  const [ride, setRide] = useState(null);

  useEffect(() => {
    socket.on('ride:new', (data) => {
      setRide(data);
    });

    return () => socket.off('ride:new');
  }, []);

  if (!ride) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-gray-600">Waiting for new ride...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <PointModule />
      <RideSummaryModule />
      <TouchableOpacity
        className="bg-orange-500 px-6 py-3 rounded-full mt-4"
        onPress={() =>
          navigation.navigate('Rating', {
            ride_id: ride.ride_id,
            rater_id: 2,
            ratee_id: 1,
          })
        }
      >
        <Text className="text-white text-lg font-semibold">Give Rating</Text>
      </TouchableOpacity>
    </View>
  );
}
