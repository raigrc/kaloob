import Service from "../models/Services.js";
const servicesService = {
  getAllServices: async () => {
    try {
      const services = await Service.find();
      return services;
    } catch (error) {
      console.error(
        "Error fetching all services in service layer:",
        error.message
      );
      throw error;
    }
  },
  getServiceById: async (id) => {
    try {
      const service = await Service.findById(id);
      return service;
    } catch (error) {
      console.error(
        "Error fetching one service in service layer:",
        error.message
      );
      throw error;
    }
  },
  addService: async (data) => {
    try {
      const existingService = await Service.findOne({
        date: data.date,
      });
      if (existingService) {
        throw new Error("Service with this date already exists");
      }

      const newService = new Service(data);
      await newService.save();
      return newService;
    } catch (error) {
      console.error("Error adding service in service layer:", error.message);
      throw error;
    }
  },
  updateService: async (id, data) => {
    try {
      const updatedService = await Service.findByIdAndUpdate(id, data, {
        new: true,
      });
      return updatedService;
    } catch (error) {
      console.error("Error updating service in service layer:", error.message);
      throw error;
    }
  },
  deleteService: async (id) => {
    try {
      const deletedService = await Service.findByIdAndDelete(id);
      return deletedService;
    } catch (error) {
      console.error("Error deleting service in service layer:", error.message);
      throw error;
    }
  },
};

export default servicesService;
