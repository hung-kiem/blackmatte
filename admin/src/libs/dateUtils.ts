import moment from "moment";

export const formatDate = (
  timestamp: number,
  pattern: string = "DD/MM/YYYY",
): string => {
  return moment(timestamp).format(pattern);
};

export const formatDateTime = (
  date: Date,
  pattern: string = "DD/MM/YYYY HH:mm:ss",
): string => {
  return moment(date).format(pattern);
};
