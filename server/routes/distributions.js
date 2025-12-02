import express from "express";
import distributionController from "../controllers/distributions.js";

const router = express.Router();

router.get("/", distributionController.getAllDistributions);
router.get("/:id", distributionController.getDistributionById);
router.post("/", distributionController.addDistribution);

export default router;
