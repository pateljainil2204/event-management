import express from "express";
import authRoute from "./authroute.js";
import userRoute from "./userroute.js";
import eventRoute from "./eventroute.js";
import registrationRoute from "./registerroute.js";
import activityRoute from "./activityroute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/events", eventRoute);
router.use("/registrations", registrationRoute);
router.use("/activity", activityRoute);

export default router;
