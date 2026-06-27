import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../app/navigation/navigation.types';
import { formatCurrency } from '../../../shared/utils/currency';
import { useGoals } from '../context/GoalsContext';
import {
  getProgressPercentage,
  getRemainingAmount,
} from '../utils/goalCalculations';

type Props = NativeStackScreenProps<RootStackParamList, 'GoalDetail'>;

export function GoalDetailScreen({ route }: Props) {
  const { goalId } = route.params;
  const { addContribution, goals } = useGoals();
  const [contributionAmount, setContributionAmount] = useState('');

  const goal = goals.find((currentGoal) => currentGoal.id === goalId);

  if (!goal) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meta no encontrada</Text>
      </View>
    );
  }

  const remainingAmount = getRemainingAmount(
    goal.targetAmount,
    goal.savedAmount,
  );
  const progressPercentage = getProgressPercentage(
    goal.targetAmount,
    goal.savedAmount,
  );

  const handleAddContribution = () => {
    const parsedAmount = Number(contributionAmount.replace(',', '.'));

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Monto inválido', 'Escribe un abono mayor a 0.');
      return;
    }

    addContribution(goal.id, parsedAmount);
    setContributionAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{goal.title}</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Objetivo: {formatCurrency(goal.targetAmount)}
        </Text>
        <Text style={styles.summaryText}>
          Ahorrado: {formatCurrency(goal.savedAmount)}
        </Text>
        <Text style={styles.remainingText}>
          Falta: {formatCurrency(remainingAmount)}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progressPercentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        {progressPercentage.toFixed(2)}% completado
      </Text>

      <Text style={styles.label}>Nuevo abono</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: 50"
        keyboardType="numeric"
        value={contributionAmount}
        onChangeText={setContributionAmount}
      />

      <Pressable style={styles.button} onPress={handleAddContribution}>
        <Text style={styles.buttonText}>Agregar abono</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },
  summary: {
    gap: 6,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  remainingText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '700',
  },
  progressContainer: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#222',
  },
  progressText: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 13,
    color: '#555',
    textAlign: 'right',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#222',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});
