// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import client from '../sanityClient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const query = `*[_type == "user" && email == $email && password == $password][0]`;
      const params = { email, password };
      const user = await client.fetch(query, params);
      if (user) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="#ff0000" />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
        color="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ff0000',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;