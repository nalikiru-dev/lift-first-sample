// src/screens/RideRequestScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import client from '../sanityClient';
import * as Location from 'expo-location';

const RideRequestScreen = ({ navigation }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const handleRequest = async () => {
    try {
      let pickupLocation = await Location.geocodeAsync(pickup);
      let dropoffLocation = await Location.geocodeAsync(dropoff);

      if (pickupLocation.length === 0 || dropoffLocation.length === 0) {
        Alert.alert('Error', 'Invalid addresses.');
        return;
      }

      await client.create({
        _type: 'ride',
        pickupLocation: {
          _type: 'geopoint',
          lat: pickupLocation[0].latitude,
          lng: pickupLocation[0].longitude,
        },
        dropoffLocation: {
          _type: 'geopoint',
          lat: dropoffLocation[0].latitude,
          lng: dropoffLocation[0].longitude,
        },
        status: 'requested',
        // Add driver reference if available
      });

      Alert.alert('Success', 'Ride requested successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to request ride.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pickup Location"
        value={pickup}
        onChangeText={setPickup}
        style={styles.input}
      />
      <TextInput
        placeholder="Dropoff Location"
        value={dropoff}
        onChangeText={setDropoff}
        style={styles.input}
      />
      <Button title="Request Ride" onPress={handleRequest} color="#ff0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ff0000',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default RideRequestScreen;