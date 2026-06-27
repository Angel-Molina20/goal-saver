export function getRemainingAmount(
  targetAmount: number,
  savedAmount: number,
): number {
  return Math.max(targetAmount - savedAmount, 0);
}

export function getProgressPercentage(
  targetAmount: number,
  savedAmount: number,
): number {
  if (targetAmount <= 0) {
    return 0;
  }

  return Math.min((savedAmount / targetAmount) * 100, 100);
}