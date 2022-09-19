/**
 * Convert hour readable form (string) in minutes (number)
 * @param hourString must be in readable format: "12:00"
 */
export function convertHourStringToMinutes(hourString: string): number {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutesAmount = hours * 60 + minutes;
  return minutesAmount;
}

/**
 * Convert minutes to hour string
 * @param minutesAmount Explicity minutes as a number: 1340
 * @returns Return hour string: "22:24"
 */
export function convertMinutesToHourString(minutesAmount: number): string {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
