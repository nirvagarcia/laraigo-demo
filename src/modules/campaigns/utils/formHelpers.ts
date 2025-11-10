export const formatDateForDisplay = (date: string | null): string => {
  if (!date) return "";
  return new Date(date).toLocaleString();
};

export const formatDateForInput = (date: string | null): string => {
  if (!date) return "";
  return new Date(date).toISOString();
};

export const validateDateString = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
