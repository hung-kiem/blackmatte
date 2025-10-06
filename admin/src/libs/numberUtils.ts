export const formatCurrency = (value: string | number) => {
  if (typeof value === "number") {
    value = value.toString();
  }
  const numericValue = value.replace(/\D/g, "");
  return new Intl.NumberFormat().format(Number(numericValue));
};
