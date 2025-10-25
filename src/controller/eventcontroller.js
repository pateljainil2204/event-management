import Event from "../model/eventmodel.js";
import logactivity from "../activity/activitylogger.js";
import {
  isNonEmptyString,
  isValidDate,
  isValidTime,
  isPositiveNumber,
} from "../utils/validator.js";
import { EventStatus, UserRoles } from "../utils/enum.js";

// Create Event (Admin or Member)
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;

    if (
      !isNonEmptyString(title) ||
      !isNonEmptyString(description) ||
      !isValidDate(date) ||
      !isValidTime(time) ||
      !isNonEmptyString(location) ||
      !isPositiveNumber(capacity)
    ) {
      return res.status(400).json({ message: "Invalid event data" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      capacity,
      createdBy: req.user.id,
      status: EventStatus.PENDING,
    });

    await logactivity(req.user.id, "Created Event", { eventId: event._id });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Event (Only creator or Admin)
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== UserRoles.ADMIN && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, date, time, location, capacity } = req.body;

    if (title && !isNonEmptyString(title)) return res.status(400).json({ message: "Invalid title" });
    if (description && !isNonEmptyString(description))
      return res.status(400).json({ message: "Invalid description" });
    if (date && !isValidDate(date)) return res.status(400).json({ message: "Invalid date" });
    if (time && !isValidTime(time)) return res.status(400).json({ message: "Invalid time" });
    if (location && !isNonEmptyString(location))
      return res.status(400).json({ message: "Invalid location" });
    if (capacity && !isPositiveNumber(capacity))
      return res.status(400).json({ message: "Invalid capacity" });

    Object.assign(event, req.body);
    await event.save();

    await logactivity(req.user.id, "Updated Event", { eventId: event._id });

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Event (Only creator or Admin)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (req.user.role !== UserRoles.ADMIN && event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    await logactivity(req.user.id, "Deleted Event", { eventId: event._id });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Events (All users, filter by date/location)
const getEvents = async (req, res) => {
  try {
    const { date, location } = req.query;
    const filter = { status: EventStatus.APPROVED };

    if (date) filter.date = date;
    if (location) filter.location = location;

    const events = await Event.find(filter).populate("createdBy", "name email role");

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve or Reject Event (Admin only)
const approveEvent = async (req, res) => {
  try {
    if (req.user.role !== UserRoles.ADMIN) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;
    if (![EventStatus.APPROVED, EventStatus.REJECTED].includes(status)) {
      return res.status(400).json({ message: "Invalid event status" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.status = status;
    await event.save();

    await logactivity(req.user.id, `${status} Event`, { eventId: event._id });

    res.status(200).json({ message: `Event ${status}`, event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search Events by Date
const searchEventsByDate = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date || !isValidDate(date)) {
      return res.status(400).json({ message: "Invalid or missing date" });
    }

    const events = await Event.find({ date, status: EventStatus.APPROVED })
      .populate("createdBy", "name email role");

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found for this date" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search Events by Location (City)
const searchEventsByLocation = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location || !isNonEmptyString(location)) {
      return res.status(400).json({ message: "Invalid or missing location" });
    }

    const events = await Event.find({ 
      location: { $regex: location, $options: "i" }, 
      status: EventStatus.APPROVED 
    }).populate("createdBy", "name email role");

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found for this location" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createEvent, updateEvent, deleteEvent, getEvents, approveEvent, 
          searchEventsByDate, searchEventsByLocation };