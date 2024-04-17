import React from 'react';
import { Text } from 'react-native';
import Card from './Card';
import styles from '../styles';

const ExerciseCard = ({ exercise }) => {
  return (
    <Card>
      <Text style={styles.buttonText}>{exercise.exercise.name}</Text>
      <Text style={styles.buttonText}>
        {exercise.sets}x{exercise.reps}
      </Text>
    </Card>
  );
};

export default ExerciseCard;
