import mongoose from "mongoose";
import dotenv from "dotenv";
import Dancer from "../models/Dancer.js";
import Attendance from "../models/Attendance.js";
import Service from "../models/Services.js";
import LGBalance from "../models/LGBalance.js";
import Distribution from "../models/Distributions.js";

dotenv.config();

const resetData = async () => {
  try {
    // Validate MONGO_URI
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in environment variables");
      process.exit(1);
    }

    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Count current data
    const dancerCount = await Dancer.countDocuments();
    const serviceCount = await Service.countDocuments();
    const attendanceCount = await Attendance.countDocuments();
    const distributionCount = await Distribution.countDocuments();
    const lgBalanceCount = await LGBalance.countDocuments();

    console.log("\n📊 Current Data:");
    console.log(`   Dancers: ${dancerCount} (will be kept)`);
    console.log(`   Services: ${serviceCount} (will be deleted)`);
    console.log(`   Attendance: ${attendanceCount} (will be deleted)`);
    console.log(`   Distributions: ${distributionCount} (will be deleted)`);
    console.log(`   LG Balances: ${lgBalanceCount} (will be deleted)`);

    console.log("\n⚠️  Starting reset in 3 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Delete all financial data
    console.log("\n🗑️  Deleting data...");

    const deletedServices = await Service.deleteMany({});
    console.log(`   ✅ Deleted ${deletedServices.deletedCount} services`);

    const deletedAttendance = await Attendance.deleteMany({});
    console.log(`   ✅ Deleted ${deletedAttendance.deletedCount} attendance records`);

    const deletedDistributions = await Distribution.deleteMany({});
    console.log(`   ✅ Deleted ${deletedDistributions.deletedCount} distributions`);

    const deletedBalances = await LGBalance.deleteMany({});
    console.log(`   ✅ Deleted ${deletedBalances.deletedCount} LG balances`);

    // Verify reset
    const remainingDancers = await Dancer.countDocuments();
    console.log(`\n✅ Reset complete! ${remainingDancers} dancers remain.`);
    console.log("💡 All financial data has been cleared. Ready for fresh start!");

    // Close connection
    await mongoose.connection.close();
    console.log("👋 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during reset:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

resetData();
