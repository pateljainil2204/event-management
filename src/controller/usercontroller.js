import User from "../model/usermodel.js";
import Event from "../model/eventmodel.js";
import Registration from "../model/registermodel.js";
import logactivity from "../activity/activitylogger.js";
import { UserRoles } from "../utils/enum.js";
import { isNonEmptyString } from "../utils/validator.js";

// Get all users with their events and registrations (Admin only)
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== UserRoles.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const users = await User.find().select("-password");

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const events = await Event.find({ createdBy: user._id });
        const registrations = await Registration.find({ user: user._id }).populate(
          "event",
          "title date time location"
        );

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          events,
          registrations,
        };
      })
    );

    await logactivity(req.user.id, "Viewed All Users with Events and Registrations");

    res.status(200).json(usersWithDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Search users by name or email (Admin only)
const searchUser = async (req, res) => {
  try {
    if (req.user.role !== UserRoles.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { search } = req.body;
    if (!isNonEmptyString(search)) {
      return res.status(400).json({ message: "Search field is required" });
    }

    const filter = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await User.find(filter).select("-password");

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const events = await Event.find({ createdBy: user._id });
        const registrations = await Registration.find({ user: user._id }).populate(
          "event",
          "title date time location"
        );

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          events,
          registrations,
        };
      })
    );

    await logactivity(req.user.id, `Searched Users: ${search}`);

    res.status(200).json(usersWithDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getAllUsers, searchUser };
