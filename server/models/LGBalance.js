import mongoose from "mongoose";

const lgBalanceSchema = new mongoose.Schema(
  {
    dancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dancer",
      required: true,
    },
    totalEarnings: {
      type: Number,
      required: true,
      default: 0,
    },
    totalDistributions: {
      type: Number,
      required: true,
      default: 0,
    },
    currentBalance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Add index for dancerId for better query performance
lgBalanceSchema.index({ dancerId: 1 });

const LGBalance = mongoose.model("LGBalance", lgBalanceSchema);

export default LGBalance;
