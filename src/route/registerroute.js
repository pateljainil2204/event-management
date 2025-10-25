import express from "express";
import {
  registerEvent,
  cancelRegistration,
  getRegistrations,
} from "../controller/registercontroller.js";
import authentication from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";

const router = express.Router();

// Register for event / cancel registration
router.post("/:id/register", authentication, registerEvent);
router.put("/:id/cancel", authentication, cancelRegistration);

// Admin-only: view all registrations
router.get("/", authentication, roleMiddleware(["Admin"]), getRegistrations);

export default router;
