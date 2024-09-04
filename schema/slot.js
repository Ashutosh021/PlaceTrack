const mongoose = require("mongoose");

// Define the slot schema
const slotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the 'users' collection
    required: [true, "User ID is required"], // Ensure userId is always provided
  },
  companyName: {
    type: String,
    required: [true, "Company Name is required"],
  },
  companyCity: {
    type: String,
    required: [true, "Company City is required"],
  },
  reportingDate: {
    type: String,
    required: [true, "Reporting Date is required"],
  },
  reportingTime: {
    type: String,
    required: [true, "Reporting Time is required"],
  },
  locationPic:{
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  realTimeLocation: {
    type:String,
    default:null
  },
});

// Create the Slot model
const slotModel = mongoose.model("slots", slotSchema);

module.exports = slotModel;
