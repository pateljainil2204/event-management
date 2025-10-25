import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Registered", "Cancelled"], default: "Registered" },
  },
  { timestamps: true }
);

// prevent duplicate registrations for the same event
registrationSchema.index({ event: 1, user: 1 }, { unique: true });

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;
