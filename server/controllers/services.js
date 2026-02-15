import servicesService from "../services/services.js";

const servicesController = {
  getAllServices: async (req, res) => {
    try {
      const services = await servicesService.getAllServices();
      if (!services || services.length === 0) {
        return res.status(404).json({ message: "No services found" });
      }
      return res.status(200).json(services);
    } catch (error) {
      console.error(
        "Error fetching all services in controller:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },
  getServiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const service = await servicesService.getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching one service in controller:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  },
  addService: async (req, res) => {
    try {
      const { date, totalDancers, totalLGCollected } = req.body;

      if (!date || !totalDancers || !totalLGCollected) {
        return res
          .status(400)
          .json({ message: "Date, total dancers, and total LG are required" });
      }

      const newService = await servicesService.addService({
        date,
        totalDancers,
        totalLGCollected,
      });

      return res
        .status(201)
        .json({ message: "Service added successfully", newService });
    } catch (error) {
      console.error("Error adding service in controller:", error.message);
      // Handle specific errors, like duplicate date
      if (error.message.includes("Service with this date already exists")) {
        return res.status(409).json({ message: error.message }); // 409 Conflict
      }
      res.status(500).json({ message: "Server Error" });
    }
  },
  updateService: async (req, res) => {
    try {
      const { id } = req.params;
      const { date, totalDancers, totalLGCollected } = req.body;

      if (!date || !totalDancers || !totalLGCollected) {
        return res
          .status(400)
          .json({ message: "Date, total dancers, and total LG are required" });
      }

      const updatedService = await servicesService.updateService(id, {
        date,
        totalDancers,
        totalLGCollected,
      });

      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json({ message: "Service updated successfully" });
    } catch (error) {
      console.error("Error updating service in controller:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  },
  deleteService: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedService = await servicesService.deleteService(id);

      if (!deletedService) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service in controller:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

export default servicesController;
