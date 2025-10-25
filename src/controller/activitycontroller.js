import Activity from "../model/activitymodel.js";

// Get all activities (Admin only)
const getAllActivity = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied — Admins only" });
    }

    const activities = await Activity.find()
      .populate("user", "name email role") // shows user name, email, role
      .sort({ createdAt: -1 }); // newest first

    if (!activities || activities.length === 0) {
      return res.status(200).json({ message: "No activities found", activities: [] });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllActivity;
