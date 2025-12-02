import Distribution from "../models/Distributions.js";

const distributionService = {
  getAllDistributions: async () => {
    try {
      const distributions = await Distribution.find().populate("dancerId");
      return distributions;
    } catch (error) {
      console.error("Error fetching distributions in service:", error.message);
      throw error;
    }
  },

  getDistributionById: async (id) => {
    try {
      const distribution = await Distribution.findById(id).populate("dancerId");
      return distribution;
    } catch (error) {
      console.error("Error fetching distribution by ID in service:", error.message);
      throw error;
    }
  },

  addDistribution: async (dancerId, amount, distributionDate) => {
    try {
      const newDistribution = new Distribution({
        dancerId,
        amount,
        distributionDate,
      });
      await newDistribution.save();
      return newDistribution;
    } catch (error) {
      console.error("Error adding distribution in service:", error.message);
      throw error;
    }
  },
};

export default distributionService;
