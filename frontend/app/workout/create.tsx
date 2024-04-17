import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../../styles';
import AddExerciseModal from '../../components/AddExerciseModal';
import AddCard from '../../components/AddCard';
import ExerciseCard from '../../components/ExerciseCard';
import HorizontalScrollView from '../../components/HorizontalScollView';
import { useRouter } from 'expo-router';
import customFetch from '../../customFetch';

const CreateWorkout = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      //TODO: shoener machen
      const flatExercises = exercises.map((item) => ({
        exercise: item.exercise.name,
        reps: item.reps,
        sets: item.sets,
      }));
      const response = await customFetch(
        'http://192.168.178.79:3000/workouts/create-workout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, exercises: flatExercises }),
        },
      );

      if (!response.ok) {
        console.log(JSON.stringify({ name, exercises: flatExercises }));
        throw new Error('Failed to create workout');
      }

      router.navigate('home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a New Workout</Text>
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={name}
        onChangeText={setName}
      />
      <HorizontalScrollView title="Exercises">
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AddCard />
        </TouchableOpacity>
      </HorizontalScrollView>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Workout</Text>
      </TouchableOpacity>
      <AddExerciseModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExercise={handleAddExercise}
      />
    </SafeAreaView>
  );
};

export default CreateWorkout;
