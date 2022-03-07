import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditNote from './EditNote';
import Notes from './Notes';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      >
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Edit Note" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
