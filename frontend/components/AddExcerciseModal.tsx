import React, { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddExerciseModal = ({ modalVisible, onClose, onAddExercise }) => {
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');

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
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Reps"
          value={reps}
          onChangeText={setReps}
        />
        <TextInput
          style={styles.input}
          placeholder="Sets"
          value={sets}
          onChangeText={setSets}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onAddExercise({ name, reps, sets })}
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
