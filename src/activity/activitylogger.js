import Activity from "../model/activitymodel.js";

const logactivity = async (userId, action, details = "") => {
  try {
    if (!userId || !action) return;

   await Activity.create({
    user: userId,
    action,
    details: typeof details === "object" ? JSON.stringify(details) : details,
   });

    console.log(`Activity logged: ${action}`);
  } catch (error) {
    console.error("Activity logging failed:", error.message);
  }
};

export default logactivity;
