import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from '../../styles';
import AddExerciseModal from '../../components/AddExcerciseModal';
import Card from '../../components/Card';
import AddCard from '../../components/AddCard';

const CreateWorkout = () => {
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    // Handle the form submission here
    // For example, you can call an API to create a workout
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {exercises.map((exercise, index) => (
          <Card key={index}>
            <Text style={styles.buttonText}>{exercise.name}</Text>
            <Text style={styles.buttonText}>{exercise.reps}</Text>
            <Text style={styles.buttonText}>{exercise.sets}</Text>
          </Card>
        ))}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AddCard />
        </TouchableOpacity>
      </ScrollView>
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
