import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumericInput from './NumericInput';

const AddExerciseModal = ({ modalVisible, onClose, onAddExercise }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [reps, setReps] = useState(12);
  const [sets, setSets] = useState(3);

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Add a New Exercise</Text>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={exerciseName}
          onChangeText={setExerciseName}
        />
        <NumericInput
          title="Reps"
          initialValue={12}
          onChange={setReps}
        ></NumericInput>
        <NumericInput
          title="Sets"
          initialValue={3}
          onChange={setSets}
        ></NumericInput>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            onAddExercise({ exercise: { name: exerciseName }, reps, sets })
          }
        >
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default AddExerciseModal;
