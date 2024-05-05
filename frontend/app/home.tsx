import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import ProfileButton from '../components/ProfileButton';
import styles from '../styles';
import Card from '../components/Card';
import AddCard from '../components/AddCard';
import HorizontalScrollView from '../components/HorizontalScollView';
import instance from '../interceptors';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const router = useRouter();
  const [workouts, setWorkouts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchWorkouts = async () => {
        instance
          .get('/workouts/workouts')
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('Failed to fetch workouts');
            }
            setWorkouts(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchWorkouts();

      return () => {};
    }, []),
  );

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
        <HorizontalScrollView
          title="Workouts"
          showAllAction={() => router.navigate('workouts')}
        >
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
