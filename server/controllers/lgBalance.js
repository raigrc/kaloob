import lgBalanceService from "../services/lgBalance.js";

const lgBalanceController = {
  getAllLgBalances: async (req, res) => {
    try {
      const lgBalances = await lgBalanceService.getAllLgBalances();
      return res.status(200).json(lgBalances);
    } catch (error) {
      console.error(
        "Error fetching all LG Balances in controller layer:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },

  getLGBalanceByDancerId: async (req, res) => {
    try {
      const { dancerId } = req.params;
      const lgBalance = await lgBalanceService.getLGBalanceByDancerId(dancerId);
      if (!lgBalance) {
        return res.status(404).json({ message: "LG Balance not found for this dancer" });
      }
      return res.status(200).json(lgBalance);
    } catch (error) {
      console.error(
        "Error fetching LG Balance by dancer ID in controller layer:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },

  updateLGBalance: async (req, res) => {
    try {
      const { dancerId } = req.params;
      const { totalEarnings, totalDistributions, currentBalance } = req.body;

      if (totalEarnings === undefined || totalDistributions === undefined || currentBalance === undefined) {
        return res.status(400).json({ message: "totalEarnings, totalDistributions, and currentBalance are required" });
      }

      if (totalEarnings < 0 || totalDistributions < 0) {
        return res.status(400).json({ message: "Earnings and distributions cannot be negative" });
      }

      const updatedLGBalance = await lgBalanceService.updateLGBalance(
        dancerId,
        totalEarnings,
        totalDistributions,
        currentBalance
      );

      return res.status(200).json({ message: "LG Balance updated successfully", updatedLGBalance });
    } catch (error) {
      console.error(
        "Error updating LG Balance in controller layer:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },
};

export default lgBalanceController;