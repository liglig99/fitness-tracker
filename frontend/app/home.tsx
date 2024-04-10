import { View, TouchableOpacity, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import ProfileButton from '../components/ProfileButton';
import styles from '../styles';

const HomeScreen = () => {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <ProfileButton onPress={() => router.push('login')} />
          ),
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <Text style={styles.buttonText}>Create Workout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;
