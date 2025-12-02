import distributionService from "../services/distributions.js";

const distributionController = {
  getAllDistributions: async (req, res) => {
    try {
      const distributions = await distributionService.getAllDistributions();
      if (!distributions || distributions.length === 0) {
        return res.status(404).json({ message: "No distributions found" });
      }
      return res.status(200).json(distributions);
    } catch (error) {
      console.error("Error fetching distributions in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  getDistributionById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribution = await distributionService.getDistributionById(id);
      if (!distribution) {
        return res.status(404).json({ message: "Distribution not found" });
      }
      return res.status(200).json(distribution);
    } catch (error) {
      console.error("Error fetching one distribution in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  addDistribution: async (req, res) => {
    try {
      const { dancerId, amount, distributionDate } = req.body;
      if (!dancerId || !amount || !distributionDate) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newDistribution = await distributionService.addDistribution(
        dancerId,
        amount,
        distributionDate
      );

      return res.status(201).json(newDistribution);
    } catch (error) {
      console.error("Error adding distribution in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
};

export default distributionController;
