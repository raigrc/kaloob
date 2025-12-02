import express from "express";
import lgBalanceController from "../controllers/lgBalance.js";

const router = express.Router();

// @route   GET api/lgbalance
// @desc    Get all LG Balances
// @access  Public
router.get("/", lgBalanceController.getAllLgBalances);

// @route   GET api/lgbalance/:dancerId
// @desc    Get LG Balance for a specific dancer
// @access  Public
router.get("/:dancerId", lgBalanceController.getLGBalanceByDancerId);

// @route   PUT api/lgbalance/:dancerId
// @desc    Update LG Balance for a specific dancer
// @access  Public
router.put("/:dancerId", lgBalanceController.updateLGBalance);

export default router;