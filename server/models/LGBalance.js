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

lgBalanceSchema.pre("findOneAndDelete", async function (next) {
  try {
    const lgBalance = await this.model.findOne(this.getFilter());
    if (lgBalance) {
      // Assuming you want to delete related attendance records for the dancer associated with this LGBalance
      // This might not be the correct cascading delete for LGBalance, as LGBalance is a summary.
      // If LGBalance is deleted, it might be better to recalculate or handle it differently.
      // For now, I'm commenting this out as it seems incorrect for LGBalance.
      // await mongoose.model("Attendance").deleteMany({ dancerId: lgBalance.dancerId });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const LGBalance = mongoose.model("LGBalance", lgBalanceSchema);

export default LGBalance;
