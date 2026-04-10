import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    company: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "applied"
    },

    salaryRange: String,

    notes: String,

    jdText: String,

    jdLink: String,

    dateApplied: Date
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);