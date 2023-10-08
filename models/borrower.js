const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete

const borrowerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },

    bookId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true }, // Enable getter
  }
);

// Enable soft delete
borrowerSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("borrower", borrowerSchema); // Export borrower models
