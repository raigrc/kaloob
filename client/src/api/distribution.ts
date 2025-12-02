import axios from "./axios";
import { fetchLGBalanceByID } from "./lg-balance";

export const claimLGBalance = async (dancerId: string) => {
  try {
    const now = new Date();
    const dancerBalance = await fetchLGBalanceByID(dancerId);
    const distribution = await addDistribution(
      dancerId,
      dancerBalance?.data.currentBalance,
      now
    );
    const response = await axios.put(`/lgbalance/${dancerId}`, {
      totalEarnings: dancerBalance?.data.totalEarnings,
      totalDistributions:
        dancerBalance?.data.totalDistributions +
        dancerBalance?.data.currentBalance,
      currentBalance: 0,
    });
    console.log("Successfully claimed LG Balance from", response, distribution);
  } catch (error) {
    console.error("Error fetching dancers", error);
    return null;
  }
};

export const addDistribution = async (
  dancerId: string,
  amount: number,
  distributionDate: Date
) => {
  try {
    const response = await axios.post("/distributions", {
      dancerId,
      amount,
      distributionDate,
    });
    return response;
  } catch (error) {
    console.error("Error fetching dancers", error);
    return null;
  }
};
