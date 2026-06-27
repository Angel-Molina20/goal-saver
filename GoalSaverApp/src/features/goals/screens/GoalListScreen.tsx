import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../app/navigation/navigation.types';
import { GoalCard } from '../components/GoalCard';
import { useGoals } from '../context/GoalsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'GoalList'>;

export function GoalListScreen({ navigation }: Props) {
  const { goals } = useGoals();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateGoal')}
      >
        <Text style={styles.createButtonText}>Crear meta</Text>
      </Pressable>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard
            goal={item}
            onPress={() =>
              navigation.navigate('GoalDetail', {
                goalId: item.id,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#222',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  listContent: {
    gap: 12,
  },
});
