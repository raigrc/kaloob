import LGBalance from "../models/LGBalance.js";

const lgBalanceService = {
  getAllLgBalances: async () => {
    try {
      const lgBalances = await LGBalance.find();
      return lgBalances;
    } catch (error) {
      console.error(
        "Error fetching all LG Balances in service layer:",
        error.message
      );
      throw error;
    }
  },

  getLGBalanceByDancerId: async (dancerId) => {
    try {
      let lgBalance = await LGBalance.findOne({ dancerId });
      if (!lgBalance) {
        // If no LG Balance record exists, create a new one with default values
        lgBalance = await LGBalance.create({
          dancerId,
          totalEarnings: 0,
          totalDistributions: 0,
          currentBalance: 0,
        });
      }
      return lgBalance;
    } catch (error) {
      console.error(
        "Error fetching or creating LG Balance by dancer ID in service layer:",
        error.message
      );
      throw error;
    }
  },

  updateLGBalance: async (
    dancerId,
    totalEarnings,
    totalDistributions,
    currentBalance
  ) => {
    try {
      const updatedLGBalance = await LGBalance.findOneAndUpdate(
        { dancerId },
        { totalEarnings, totalDistributions, currentBalance },
        { new: true, upsert: true } // upsert: create if not exists
      );
      return updatedLGBalance;
    } catch (error) {
      console.error(
        "Error updating LG Balance in service layer:",
        error.message
      );
      throw error;
    }
  },

  // You might want to add functions for adding/subtracting from earnings/distributions
  // and then recalculating the currentBalance, rather than directly setting them.
  // For example:
  // addEarnings: async (dancerId, amount) => { ... },
  // addDistributions: async (dancerId, amount) => { ... },
};

export default lgBalanceService;
