import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatCurrency } from '../../../shared/utils/currency';
import { Goal } from '../types/goal.types';
import {
  getProgressPercentage,
  getRemainingAmount,
} from '../utils/goalCalculations';

type GoalCardProps = {
  goal: Goal;
  onPress: () => void;
};

const categoryLabels: Record<Goal['category'], string> = {
  travel: 'Viaje',
  games: 'Juegos',
  technology: 'Tecnología',
  education: 'Educación',
  health: 'Salud',
  other: 'Otro',
};

const categoryIcons: Record<Goal['category'], string> = {
  travel: '✈️',
  games: '🎮',
  technology: '💻',
  education: '📚',
  health: '❤️',
  other: '🎯',
};

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const remainingAmount = getRemainingAmount(
    goal.targetAmount,
    goal.savedAmount,
  );

  const progressPercentage = getProgressPercentage(
    goal.targetAmount,
    goal.savedAmount,
  );

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {categoryIcons[goal.category]} {goal.title}
        </Text>

        <Text style={styles.category}>{categoryLabels[goal.category]}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          Objetivo: {formatCurrency(goal.targetAmount)}
        </Text>

        <Text style={styles.amountText}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  category: {
    marginTop: 4,
    fontSize: 14,
    color: '#777',
  },
  amountContainer: {
    gap: 4,
    marginBottom: 12,
  },
  amountText: {
    fontSize: 14,
    color: '#333',
  },
  remainingText: {
    fontSize: 14,
    color: '#111',
    fontWeight: '700',
  },
  progressContainer: {
    height: 10,
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
    fontSize: 13,
    color: '#555',
    textAlign: 'right',
  },
});