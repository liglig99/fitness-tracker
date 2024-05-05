import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Pressable } from 'react-native';
import styles from '../../styles';
import ExerciseCard from '../../components/ExerciseCard';
import HorizontalScrollView from '../../components/HorizontalScollView';
import instance from '../../interceptors';

const WorkoutPage = () => {
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      instance
        .get(`/workouts/workout/${id}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Failed to fetch workout');
          }
          setWorkout(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchWorkout();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{workout?.name ?? 'Workout Name'}</Text>
      <HorizontalScrollView title="Exercises">
        {workout?.exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </HorizontalScrollView>
      <Pressable style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default WorkoutPage;
