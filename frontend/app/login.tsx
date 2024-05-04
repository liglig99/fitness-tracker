import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import instance from '../interceptors';
import styles from '../styles';

const LoginScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await instance.post(
        '/auth/login',
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      router.back();
    } catch (error) {
      console.error(error); // todo handle wrong credentials
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaaaaa"
        value={username}
        onChangeText={setUsername}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
