export const currencyFormat = (amount: number): string => {
  return amount.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
};
