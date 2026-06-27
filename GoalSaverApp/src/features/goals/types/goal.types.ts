export type GoalCategory =
  | 'travel'
  | 'games'
  | 'technology'
  | 'education'
  | 'health'
  | 'other';

export type Goal = {
  id: string;
  title: string;
  category: GoalCategory;
  targetAmount: number;
  savedAmount: number;
  createdAt: string;
  updatedAt: string;
};