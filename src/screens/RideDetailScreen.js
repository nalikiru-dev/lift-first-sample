// src/screens/RideDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import client from '../sanityClient';

const RideDetailScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [ride, setRide] = useState(null);

  useEffect(() => {
    const fetchRide = async () => {
      const query = `*[_type == "ride" && _id == $id][0]`;
      const params = { id: rideId };
      const rideData = await client.fetch(query, params);
      setRide(rideData);
    };
    fetchRide();
  }, [rideId]);

  const handleAccept = async () => {
    try {
      await client
        .patch(rideId)
        .set({ status: 'accepted' })
        .commit();
      Alert.alert('Success', 'Ride accepted!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to accept ride.');
      console.error(error);
    }
  };

  if (!ride) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text>Pickup: {ride.pickupLocation.lat}, {ride.pickupLocation.lng}</Text>
      <Text>Dropoff: {ride.dropoffLocation.lat}, {ride.dropoffLocation.lng}</Text>
      <Text>Status: {ride.status}</Text>
      {ride.status === 'requested' && (
        <Button title="Accept Ride" onPress={handleAccept} color="#ff0000" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default RideDetailScreen;