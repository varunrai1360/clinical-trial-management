const mongoose = require("mongoose");

const TrialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["ongoing", "completed", "paused"], default: "ongoing" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("ClinicalTrial", TrialSchema);
