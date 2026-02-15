import attendanceService from "../services/attendance.js";

const attendanceController = {
  getAllAttendance: async (req, res) => {
    try {
      const attendanceRecords = await attendanceService.getAllAttendance();
      if (!attendanceRecords || attendanceRecords.length === 0) {
        return res.status(404).json({ message: "No attendance records found" });
      }
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error(
        "Error fetching all attendance records in controller layer:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },
  getAttendanceById: async (req, res) => {
    try {
      const { id } = req.params;
      const attendanceRecord = await attendanceService.getAttendanceById(id);
      if (!attendanceRecord) {
        return res.status(404).json({ message: "Attendance record not found" });
      }
      return res.status(200).json(attendanceRecord);
    } catch (error) {
      console.error(
        "Error fetching one attendance record: in controller layer",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAttendanceByServiceId: async (req, res) => {
    try {
      const { serviceId } = req.params;
      const attendanceRecords = await attendanceService.getAttendanceByServiceId(serviceId);
      if (!attendanceRecords || attendanceRecords.length === 0) {
        return res.status(404).json({ message: "No attendance records found for this service" });
      }
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error(
        "Error fetching attendance by service ID in controller layer:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAttendanceByDancerId: async (req, res) => {
    try {
      const { dancerId } = req.params;
      const attendanceRecords = await attendanceService.getAttendanceByDancerId(dancerId);
      if (!attendanceRecords || attendanceRecords.length === 0) {
        return res.status(404).json({ message: "No attendance records found for this dancer" });
      }
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error(
        "Error fetching attendance by dancer ID in controller layer:",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },
  addAttendance: async (req, res) => {
    try {
      const { dancerId, serviceId, amount } = req.body;
      if (!dancerId || !serviceId || amount === undefined) {
        return res
          .status(400)
          .json({ message: "Dancer ID, Service ID, and amount are required" });
      }
      const newAttendance = await attendanceService.addAttendance(req.body);
      return res.status(201).json(newAttendance);
    } catch (error) {
      console.error(
        "Error in addAttendance controller:",
        error.message
      );
      if (error.message.includes("already exists")) {
        return res.status(409).json({ message: error.message }); // 409 Conflict
      }
      res.status(500).json({ message: "Server Error" });
    }
  },
  updateAttendance: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAttendance = await attendanceService.updateAttendance(id, {
        ...req.body,
      });
      if (!updatedAttendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }
      return res.status(200).json({
        message: "Attendance updated successfully",
        updatedAttendance,
      });
    } catch (error) {
      console.error(
        "Error updating attendance record: in controller layer",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },
  deleteAttendance: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAttendance = await attendanceService.deleteAttendance(id);
      if (!deletedAttendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }
      return res
        .status(200)
        .json({ message: "Attendance record deleted successfully" });
    } catch (error) {
      console.error(
        "Error deleting attendance record: in controller layer",
        error.message
      );
      res.status(500).json({ message: "Server Error" });
    }
  },
};

export default attendanceController;
