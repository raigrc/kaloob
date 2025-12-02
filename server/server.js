import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dancerRoutes from "./routes/dancers.js";
import attendanceRoutes from "./routes/attendance.js";
import serviceRoutes from "./routes/services.js";
import lgBalanceRoutes from "./routes/lgBalance.js";
import distributionRoutes from "./routes/distributions.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://kaloob.raigrc.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/dancers", dancerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/lgbalance", lgBalanceRoutes);
app.use("/api/distributions", distributionRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
