import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

import styles from '../styles';

interface HorizontalScrollViewProps {
  title: string;
  children: React.ReactNode;
  showAllAction?: () => void;
}

const HorizontalScrollView: React.FC<HorizontalScrollViewProps> = ({
  title,
  children,
  showAllAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.subtitile}>{title}</Text>
        {showAllAction && (
          <Pressable onPress={showAllAction}>
            <Text style={styles.subtitile}>Show all</Text>
          </Pressable>
        )}
      </View>
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
