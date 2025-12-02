import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    dancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dancer",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
