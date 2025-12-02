import Attendance from "../models/Attendance.js";

const attendanceService = {
  getAllAttendance: async () => {
    // Logic to fetch all attendance records
    // This should return an array of attendance records
    try {
      const attendanceRecords = await Attendance.find();
      return attendanceRecords;
    } catch (error) {
      console.error(
        "Error fetching attendance records in service layer:",
        error.message
      );
      throw error;
    }
  },

  getAttendanceById: async (id) => {
    // Logic to fetch a specific attendance record by ID
    // This should return the attendance record if found, or null if not found
    try {
      const attendanceRecord = await Attendance.findById(id);
      return attendanceRecord;
    } catch (error) {
      console.error(
        "Error fetching one attendance record in service layer:",
        error.message
      );
      throw error;
    }
  },

  getAttendanceByServiceId: async (serviceId) => {
    try {
      const attendanceRecords = await Attendance.find({ serviceId });
      return attendanceRecords;
    } catch (error) {
      console.error(
        "Error fetching attendance by service ID in service layer:",
        error.message
      );
      throw error;
    }
  },

  getAttendanceByDancerId: async (dancerId) => {
    try {
      const attendanceRecords = await Attendance.find({ dancerId });
      return attendanceRecords;
    } catch (error) {
      console.error(
        "Error fetching attendance by dancer ID in service layer:",
        error.message
      );
      throw error;
    }
  },

  addAttendance: async (attendanceData) => {
    // Logic to add a new attendance record
    // This should return the newly created attendance record
    try {
      // Check if an attendance record already exists for this dancer and service
      const existingAttendance = await Attendance.findOne({
        dancerId: attendanceData.dancerId,
        serviceId: attendanceData.serviceId,
      });

      if (existingAttendance) {
        throw new Error(
          "Attendance record already exists for this dancer and service"
        );
      }

      // Correctly create the new attendance record
      const newAttendance = new Attendance(attendanceData);
      await newAttendance.save();
      return newAttendance;
    } catch (error) {
      console.error(
        "Error adding attendance record in service layer:",
        error
      );
      // Re-throw the original error to be handled by the controller
      throw error;
    }
  },

  updateAttendance: async (id, updatedData) => {
    // Logic to update an existing attendance record by ID
    // This should return the updated attendance record
    try {
      const updatedAttendance = await Attendance.findByIdAndUpdate(
        id,
        updatedData,
        {
          new: true,
        }
      );
      return updatedAttendance;
    } catch (error) {
      console.error(
        "Error updatingg attendance record in service layer:",
        error.message
      );
      throw error;
    }
  },

  deleteAttendance: async (id) => {
    // Logic to delete an attendance record by ID
    // This should return a success message or throw an error if not found
    try {
      const deletedAttendance = await Attendance.findByIdAndDelete(id);
      if (!deletedAttendance) {
        throw new Error("Attendance record not found");
      }
      return { message: "Attendance record deleted successfully" };
    } catch (error) {
      console.error(
        "Error deleting attendance record in service layer:",
        error.message
      );
      throw error;
    }
  },
};

export default attendanceService;
