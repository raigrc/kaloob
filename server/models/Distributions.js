import mongoose from "mongoose";

const distributionSchema = new mongoose.Schema(
  {
    dancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dancer",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    distributionDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Distribution = mongoose.model("Distribution", distributionSchema);

export default Distribution;
