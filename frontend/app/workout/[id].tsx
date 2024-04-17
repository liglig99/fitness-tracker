import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import styles from '../../styles';
import ExerciseCard from '../../components/ExerciseCard';
import HorizontalScrollView from '../../components/HorizontalScollView';

const WorkoutPage = () => {
  const { id } = useLocalSearchParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `http://192.168.178.79:3000/workouts/workout/${id}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch workout');
        }

        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error(error);
      }
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
    </SafeAreaView>
  );
};

export default WorkoutPage;
