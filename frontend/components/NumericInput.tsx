import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../styles';

const NumericInput = ({ title, value, onChange, min = 0, max = 100 }) => {
  const handleMinus = () => {
    if (value > min) {
      const newValue = value - 1;
      onChange(newValue);
    }
  };

  const handlePlus = () => {
    if (value < max) {
      const newValue = value + 1;
      onChange(newValue);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.buttonText}>{title}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Pressable style={styles.buttonContainer} onPress={handleMinus}>
          <MaterialIcons
            style={{ padding: 10 }}
            name="remove"
            size={24}
            color="black"
          />
        </Pressable>
        <View
          style={[styles.buttonContainer, { marginLeft: 0, marginRight: 0 }]}
        >
          <Text style={[styles.buttonText, { width: 100 }]}>{value}</Text>
        </View>
        <Pressable style={styles.buttonContainer} onPress={handlePlus}>
          <MaterialIcons
            style={{ padding: 10 }}
            name="add"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default NumericInput;
