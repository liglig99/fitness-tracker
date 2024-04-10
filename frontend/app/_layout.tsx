import { Stack, router } from 'expo-router';
import { COLORS } from '../styles';
import { useEffect } from 'react';

const StackLayout = () => {
  useEffect(() => {
    router.navigate('home');
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.interactiveColor1,
        },
        headerTintColor: COLORS.textColor1,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="home" options={{}} />
    </Stack>
  );
};

export default StackLayout;
