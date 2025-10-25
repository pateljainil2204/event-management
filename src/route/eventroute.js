import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  approveEvent,
  searchEventsByDate,
  searchEventsByLocation
} from "../controller/eventcontroller.js";
import authentication from "../middleware/authmiddleware.js";
import roleMiddleware from "../middleware/rolemiddleware.js";

const router = express.Router();

router.post("/", authentication, createEvent);
router.put("/:id", authentication, updateEvent);
router.delete("/:id", authentication, deleteEvent);
router.get("/", authentication, getEvents);
router.put("/approve/:id", authentication, roleMiddleware(["Admin"]), approveEvent);
router.post("/search/date", authentication, searchEventsByDate);
router.post("/search/location", authentication, searchEventsByLocation);

export default router;
