import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import ProfileButton from '../components/ProfileButton';
import styles from '../styles';
import Card from '../components/Card';
import AddCard from '../components/AddCard';
import HorizontalScrollView from '../components/HorizontalScollView';
import customFetch from '../customFetch';

const HomeScreen = () => {
  const router = useRouter();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await customFetch(
          'http://192.168.178.79:3000/workouts/workouts',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }
        const data = await response.json();
        setWorkouts(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <ProfileButton onPress={() => router.navigate('login')} />
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        <HorizontalScrollView title="Workouts">
          {workouts.map((workout, index) => (
            <TouchableOpacity
              onPress={() => router.navigate(`/workout/${workout._id}`)}
              key={index}
            >
              <Card key={index}>
                <Text style={styles.buttonText}>{workout.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => router.navigate('workout/create')}>
            <AddCard />
          </TouchableOpacity>
        </HorizontalScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
