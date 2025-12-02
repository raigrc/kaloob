import express from "express";
import dancerController from "../controllers/dancers.js";

const router = express.Router();

// @route   GET api/dancers
// @desc    Get all dancers
// @access  Public
router.get("/", dancerController.getAllDancers);
router.get("/dist", dancerController.fetchDancerWithHistory);
router.get("/:id", dancerController.getDancerById);
router.post("/", dancerController.addDancer);
router.put("/:id", dancerController.updateDancer);
router.delete("/:id", dancerController.deleteDancer);

export default router;
