import axios from "./axios";

export const fetchAllLGBalances = async () => {
  try {
    const response = await axios.get("/lgbalance");
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
export const fetchLGBalanceByID = async (dancerId: string | undefined) => {
  try {
    const response = await axios.get(`/lgbalance/${dancerId}`);
    return response;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};

export const sumAllLGBalances = async (): Promise<number> => {
  try {
    const response = await fetchAllLGBalances();
    if (response && response.data) {
      const totalBalance = response.data.reduce(
        (sum: number, balance: any) =>
          sum + (balance.totalEarnings - balance.totalDistributions || 0),
        0
      );
      return totalBalance;
    }
    return 0;
  } catch (error) {
    console.error("Error summing LG balances", error);
    return 0;
  }
};
