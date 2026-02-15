import mongoose from "mongoose";
import dotenv from "dotenv";
import Attendance from "../models/Attendance.js";
import Dancer from "../models/Dancer.js";

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Special dancers who earn 100, others earn 50
const specialNames = ["Trixie", "Gwen", "Zach"];

async function migrateAttendanceAmounts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Get all attendance records
    const attendances = await Attendance.find().populate("dancerId");
    console.log(`📊 Found ${attendances.length} attendance records`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Update each attendance record with the correct amount
    for (const attendance of attendances) {
      // Skip if amount is already set (not 0)
      if (attendance.amount && attendance.amount > 0) {
        skippedCount++;
        continue;
      }

      // Get the dancer
      const dancer = attendance.dancerId;
      if (!dancer) {
        console.log(`⚠️  Attendance ${attendance._id} has no dancer reference`);
        continue;
      }

      // Determine the amount based on dancer name
      const amount = specialNames.includes(dancer.name) ? 100 : 50;

      // Update the attendance record
      await Attendance.findByIdAndUpdate(attendance._id, { amount });
      updatedCount++;

      console.log(`✅ Updated ${dancer.name}: ${amount} pesos`);
    }

    console.log("\n📈 Migration Summary:");
    console.log(`   Total records: ${attendances.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Skipped (already set): ${skippedCount}`);

    console.log("\n✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run the migration
migrateAttendanceAmounts();
