import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GoalsProvider } from '../../features/goals/context/GoalsContext';
import { CreateGoalScreen } from '../../features/goals/screens/CreateGoalScreen';
import { GoalDetailScreen } from '../../features/goals/screens/GoalDetailScreen';
import { GoalListScreen } from '../../features/goals/screens/GoalListScreen';
import { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <GoalsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GoalList">
          <Stack.Screen
            name="GoalList"
            component={GoalListScreen}
            options={{ title: 'Mis metas' }}
          />

          <Stack.Screen
            name="CreateGoal"
            component={CreateGoalScreen}
            options={{ title: 'Nueva meta' }}
          />

          <Stack.Screen
            name="GoalDetail"
            component={GoalDetailScreen}
            options={{ title: 'Detalle de meta' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GoalsProvider>
  );
}
