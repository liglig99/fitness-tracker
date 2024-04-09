import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileButton from './components/ProfileButton';
import customFetch from './customFetch';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerLeft: () => null,
            headerRight: () => (
              <ProfileButton
                onPress={async () => {
                  const resp = await customFetch(
                    'http://192.168.178.79:3000/profile',
                    {},
                  );
                  console.log(await resp.json());
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
