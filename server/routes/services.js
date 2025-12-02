import express from "express";
import servicesController from "../controllers/services.js";

const router = express.Router();

router.get("/", servicesController.getAllServices);
router.get("/:id", servicesController.getServiceById);
router.post("/", servicesController.addService);
router.put("/:id", servicesController.updateService);
router.delete("/:id", servicesController.deleteService);

export default router;
