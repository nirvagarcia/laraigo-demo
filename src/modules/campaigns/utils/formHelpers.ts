export const formatTimeForInput = (date?: Date): string => {
  if (!date) return "";
  return date.toTimeString().slice(0, 5);
};

export const parseTimeFromInput = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const isScheduledExecution = (executionType: string): boolean => {
  return executionType === "programada";
};

export const validateTimeString = (timeString: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
};
