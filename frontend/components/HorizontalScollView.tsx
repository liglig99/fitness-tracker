import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../styles';

const HorizontalScrollView = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitile}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default HorizontalScrollView;
