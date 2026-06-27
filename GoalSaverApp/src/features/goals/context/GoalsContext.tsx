import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Goal, GoalCategory } from '../types/goal.types';

type CreateGoalInput = {
  title: string;
  targetAmount: number;
  category?: GoalCategory;
};

type GoalsContextValue = {
  goals: Goal[];
  addGoal: (input: CreateGoalInput) => Goal;
  addContribution: (goalId: string, amount: number) => void;
};

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Viaje a Europa',
    category: 'travel',
    targetAmount: 10000,
    savedAmount: 2500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Juego PS5',
    category: 'games',
    targetAmount: 70,
    savedAmount: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const GoalsContext = createContext<GoalsContextValue | undefined>(undefined);

export function GoalsProvider({ children }: PropsWithChildren) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const addGoal = useCallback((input: CreateGoalInput) => {
    const now = new Date().toISOString();
    const goal: Goal = {
      id: `${Date.now()}`,
      title: input.title,
      category: input.category ?? 'other',
      targetAmount: input.targetAmount,
      savedAmount: 0,
      createdAt: now,
      updatedAt: now,
    };

    setGoals((currentGoals) => [goal, ...currentGoals]);

    return goal;
  }, []);

  const addContribution = useCallback((goalId: string, amount: number) => {
    const now = new Date().toISOString();

    setGoals((currentGoals) =>
      currentGoals.map((goal) => {
        if (goal.id !== goalId) {
          return goal;
        }

        return {
          ...goal,
          savedAmount: Math.min(goal.savedAmount + amount, goal.targetAmount),
          updatedAt: now,
        };
      }),
    );
  }, []);

  const value = useMemo(
    () => ({
      goals,
      addGoal,
      addContribution,
    }),
    [addContribution, addGoal, goals],
  );

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);

  if (!context) {
    throw new Error('useGoals must be used inside GoalsProvider');
  }

  return context;
}
