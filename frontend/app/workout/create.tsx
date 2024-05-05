import React, { useState } from 'react';
import { Text, TextInput, Pressable, SafeAreaView } from 'react-native';
import styles from '../../styles';
import AddExerciseModal from '../../components/AddExerciseModal';
import AddCard from '../../components/AddCard';
import ExerciseCard from '../../components/ExerciseCard';
import HorizontalScrollView from '../../components/HorizontalScollView';
import { useRouter } from 'expo-router';
import instance from '../../interceptors';

const CreateWorkout = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    //TODO: shoener machen
    const flatExercises = exercises.map((item) => ({
      exercise: item.exercise.name,
      reps: item.reps,
      sets: item.sets,
    }));
    instance
      .post(
        '/workouts/create-workout',
        JSON.stringify({ name, exercises: flatExercises }),
      )
      .then((response) => {
        if (response.status !== 200) {
          console.log(JSON.stringify({ name, exercises: flatExercises }));
          throw new Error('Failed to create workout');
        }

        router.navigate('home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddExercise = (exercise) => {
    if (selectedExercise) {
      handleUpdateExercise(exercise);
      return;
    }
    setExercises([...exercises, exercise]);
    setModalVisible(false);
  };

  const handleUpdateExercise = (updatedExercise) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === updatedExercise.id ? updatedExercise : exercise,
      ),
    );
    setSelectedExercise(null);
    setModalVisible(false);
  };

  const handleExerciseClick = (exercise) => {
    // console.log(exercise);
    setSelectedExercise(exercise);
    setModalVisible(true);
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
          <Pressable key={index} onPress={() => handleExerciseClick(exercise)}>
            <ExerciseCard exercise={exercise} />
          </Pressable>
        ))}
        <Pressable onPress={() => setModalVisible(true)}>
          <AddCard />
        </Pressable>
      </HorizontalScrollView>
      <Pressable style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Workout</Text>
      </Pressable>
      <AddExerciseModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddExercise={handleAddExercise}
        exercise={selectedExercise}
      />
    </SafeAreaView>
  );
};

export default CreateWorkout;
