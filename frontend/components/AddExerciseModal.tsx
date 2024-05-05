import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, Pressable } from 'react-native';
import styles from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumericInput from './NumericInput';

const AddExerciseModal = ({
  modalVisible,
  onClose,
  onAddExercise,
  exercise,
}) => {
  const [exerciseName, setExerciseName] = useState(exercise?.name ?? null);
  const [reps, setReps] = useState(exercise?.reps ?? 12);
  const [sets, setSets] = useState(exercise?.sets ?? 3);

  useEffect(() => {
    setExerciseName(exercise?.exercise.name || '');
    setReps(exercise?.reps || 12);
    setSets(exercise?.sets || 3);
  }, [exercise]);

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
        <NumericInput title="Reps" value={reps} onChange={setReps} />
        <NumericInput title="Sets" value={sets} onChange={setSets} />
        <Pressable
          style={styles.buttonContainer}
          onPress={() =>
            onAddExercise({ exercise: { name: exerciseName }, reps, sets })
          }
        >
          <Text style={styles.buttonText}>Add Exercise</Text>
        </Pressable>
        <Pressable style={styles.buttonContainer} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default AddExerciseModal;
