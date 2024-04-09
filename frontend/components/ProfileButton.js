import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles';

export default function ProfileButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        style={styles.headerButton}
        name="person"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
}
