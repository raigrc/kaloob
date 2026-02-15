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
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
