import axios from "./axios";
import { addDistribution } from "./distribution";
import { fetchLGBalanceByID } from "./lg-balance";

export const getAdvanceLG = async (
  dancerId: string,
  amount: number,
  date: Date
) => {
  try {
    const dancerBalance = await fetchLGBalanceByID(dancerId);
    // if (dancerBalance?.data && dancerBalance.data.currentBalance > 0) {
    //   return { message: "You still have balance" };
    // }

    const distribution = await addDistribution(dancerId, amount, date);

    const response = await axios.put(`/lgbalance/${dancerId}`, {
      totalEarnings: dancerBalance?.data.totalEarnings,
      totalDistributions: dancerBalance?.data.totalDistributions + amount,
      currentBalance: dancerBalance?.data.currentBalance - amount,
    });

    return { response, message: "Claimed advance!" };
  } catch (error) {
    console.error("Error getting advance", error);
    return null;
  }
};
