import Registration from "../model/registermodel.js";
import Event from "../model/eventmodel.js";
import logactivity from "../activity/activitylogger.js";
import { RegistrationStatus, EventStatus } from "../utils/enum.js";

// Register for Event
const registerEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.status !== EventStatus.APPROVED) {
      return res.status(400).json({ message: "Event not available for registration" });
    }

    if (event.attendeeCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.attendeeCount += 1;
    await event.save();

    const registration = await Registration.create({
      user: req.user.id,
      event: event._id,
      status: RegistrationStatus.REGISTERED,
    });

    await logactivity(req.user.id, "Registered for Event", { eventId: event._id });

    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel Registration
const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      user: req.user.id,
      event: req.params.id,
      status: RegistrationStatus.REGISTERED,
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = RegistrationStatus.CANCELLED;
    await registration.save();

    await Event.findByIdAndUpdate(req.params.id, { $inc: { attendeeCount: -1 } });

    await logactivity(req.user.id, "Cancelled Registration", { eventId: req.params.id });

    res.status(200).json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all registrations (Admin only)
const getRegistrations = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const registrations = await Registration.find()
      .populate("user", "name email role")
      .populate("event", "title date time location");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { registerEvent, cancelRegistration, getRegistrations };
