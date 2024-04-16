import { TouchableOpacity, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import ProfileButton from '../components/ProfileButton';
import styles from '../styles';
import Card from '../components/Card';
import AddCard from '../components/AddCard';

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
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
          <Text style={styles.buttonText}>Create Workout</Text>
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          <Card>
            <Text style={styles.buttonText}>Workout 1</Text>
          </Card>
          <TouchableOpacity onPress={() => router.push('workout/create')}>
            <AddCard />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
