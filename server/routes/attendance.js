import express from "express";
import attendanceController from "../controllers/attendance.js";
const router = express.Router();

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.get("/service/:serviceId", attendanceController.getAttendanceByServiceId);
router.get("/dancer/:dancerId", attendanceController.getAttendanceByDancerId);
router.post("/", attendanceController.addAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

export default router;
