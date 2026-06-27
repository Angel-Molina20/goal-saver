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
import { useGoals } from '../context/GoalsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateGoal'>;

export function CreateGoalScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const { addGoal } = useGoals();

  const handleSave = () => {
    const cleanTitle = title.trim();
    const parsedTargetAmount = Number(targetAmount.replace(',', '.'));

    if (!cleanTitle) {
      Alert.alert('Falta el nombre', 'Escribe el nombre de tu meta.');
      return;
    }

    if (!Number.isFinite(parsedTargetAmount) || parsedTargetAmount <= 0) {
      Alert.alert('Monto inválido', 'Escribe un monto objetivo mayor a 0.');
      return;
    }

    addGoal({
      title: cleanTitle,
      targetAmount: parsedTargetAmount,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la meta</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Viaje a Europa"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Monto objetivo</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: 10000"
        keyboardType="numeric"
        value={targetAmount}
        onChangeText={setTargetAmount}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar meta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
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
    marginTop: 8,
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
