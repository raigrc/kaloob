import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true, // Each Sunday should have only one service record
    },
    totalDancers: {
      type: Number,
      required: true,
      default: 0,
    },
    totalLGCollected: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Mongoose middleware for cascading delete.
// This will run before a service is deleted via findOneAndDelete (or findByIdAndDelete).
serviceSchema.pre("findOneAndDelete", async function (next) {
  try {
    const service = await this.model.findOne(this.getFilter());
    if (service) {
      await mongoose.model("Attendance").deleteMany({ serviceId: service._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
