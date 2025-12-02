import Dancer from "../models/Dancer.js";

const dancerService = {
  getAllDancers: async () => {
    try {
      const dancers = await Dancer.find();
      return dancers;
    } catch (error) {
      console.error("Error fetching dancers in service layer:", error.message);
      throw error;
    }
  },
  getDancerById: async (id) => {
    try {
      const dancer = await Dancer.findById(id);
      return dancer;
    } catch (error) {
      console.error(
        "Error fetching one dancer in service layer:",
        error.message
      );
      throw error;
    }
  },
  addDancer: async (name) => {
    try {
      const newDancer = new Dancer({ name });
      await newDancer.save();
      return newDancer;
    } catch (error) {
      console.error("Error adding dancer in service layer:", error.message);
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new Error("Dancer with this name already exists");
      }
      throw new Error("Server Error");
    }
  },
  updateDancer: async (id, name) => {
    try {
      const updatedDancer = await Dancer.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      return updatedDancer;
    } catch (error) {
      console.error("Error updating dancer in service layer:", error.message);
      throw error;
    }
  },
  deleteDancer: async (id) => {
    try {
      const deletedDancer = await Dancer.findByIdAndDelete(id);
      return deletedDancer;
    } catch (error) {
      console.error("Error deleting dancer in service layer:", error.message);
      throw error;
    }
  },
  fetchDancerWithHistory: async () => {
    try {
      const dancers = await Dancer.aggregate([
        {
          $lookup: {
            from: "distributions",
            localField: "_id",
            foreignField: "dancerId",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  amount: 1,
                  distributionDate: 1,
                },
              },
            ],
            as: "distributions",
          },
        },
        {
          $lookup: {
            from: "lgbalances",
            localField: "_id",
            foreignField: "dancerId",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  currentBalance: 1,
                },
              },
            ],
            as: "lgbalance",
          },
        },
        { $unwind: "$lgbalance" },
        {
          $lookup: {
            from: "attendances",
            localField: "_id",
            foreignField: "dancerId",
            pipeline: [
              {
                $lookup: {
                  from: "services",
                  localField: "serviceId",
                  foreignField: "_id",
                  as: "serviceDetails",
                },
              },
              {
                $unwind: "$serviceDetails",
              },
              {
                $project: {
                  _id: 0,
                  date: "$serviceDetails.date",
                },
              },
            ],
            as: "attendances",
          },
        },
        {
          $project: {
            name: 1,
            lgbalance: "$lgbalance.currentBalance",
            history: {
              $concatArrays: [
                {
                  $map: {
                    input: "$attendances",
                    as: "att",
                    in: {
                      type: "service",
                      date: "$$att.date",
                    },
                  },
                },
                {
                  $map: {
                    input: "$distributions",
                    as: "dist",
                    in: {
                      type: "distribution",
                      date: "$$dist.distributionDate",
                      amount: "$$dist.amount",
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $unwind: "$history",
        },
        {
          $sort: { "history.date": -1 },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            lgbalance: { $first: "$lgbalance" },
            history: { $push: "$history" },
          },
        },
        {
          $sort: { name: 1 },
        },
      ]);
      return dancers;
    } catch (error) {
      console.error("Error fetching dancer in service layer:", error.message);
      throw error;
    }
  },
};

export default dancerService;
