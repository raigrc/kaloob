import dancerService from "../services/dancers.js";

const dancerController = {
  getAllDancers: async (req, res) => {
    try {
      const dancers = await dancerService.getAllDancers();
      if (!dancers || dancers.length === 0) {
        return res.status(404).json({ message: "No dancers found" });
      }
      return res.status(200).json(dancers);
    } catch (error) {
      console.error("Error fetching dancers in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  getDancerById: async (req, res) => {
    try {
      const { id } = req.params;
      const dancer = await dancerService.getDancerById(id);
      if (!dancer) {
        return res.status(404).json({ message: "Dancer not found" });
      }
      return res.status(200).json(dancer);
    } catch (error) {
      console.error("Error fetching one dancer in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  addDancer: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const newDancer = await dancerService.addDancer(name);

      return res.status(201).json(newDancer);
    } catch (error) {
      console.error("Error adding dancer in controller:", error.message);
      // Handle specific errors, like duplicate name
      if (error.message.includes("Dancer with this name already exists")) {
        return res.status(409).json({ message: error.message }); // 409 Conflict
      }
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  updateDancer: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const updatedDancer = await dancerService.updateDancer(id, name);

      if (!updatedDancer) {
        return res.status(404).json({ message: "Dancer not found" });
      }

      return res.status(200).json({ message: "Dancer updated successfully" });
    } catch (error) {
      console.error("Error updating dancer in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  deleteDancer: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedDancer = await dancerService.deleteDancer(id);

      if (!deletedDancer) {
        return res.status(404).json({ message: "Dancer not found" });
      }

      return res.status(200).json({ message: "Dancer deleted successfully" });
    } catch (error) {
      console.error("Error deleting dancer in controller:", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
  fetchDancerWithHistory: async (req, res) => {
    try {
      const dancers = await dancerService.fetchDancerWithHistory();
      if (!dancers || dancers.length == 0) {
        return res.status(404).json({ message: "No dancers found" });
      }
      return res.status(200).json(dancers);
    } catch (error) {
      console.error("Error fetching dancer in controller", error.message);
      res.status(500).json({ message: error.message || "Server Error" });
    }
  },
};

export default dancerController;
