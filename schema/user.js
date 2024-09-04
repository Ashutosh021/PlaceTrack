const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
password: {
  type: String,
  required: [true, 'Password is required'],
  minlength: 8, 
  maxlength: 128, 
},
  phone: {
    type: String,
    unique: true,
    required: [true, 'Phone is required'],
    match: [/^\d{10}$/, "Please fill a valid 10-digit phone number"], // Regular expression to validate a 10-digit phone number
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    maxlength: 1,
  },
  batch: {
    type: Number,
    required: [true, 'Batch is required'],
    minlength:[4,'Enter batch in four digits, e.g., 2025']
  },
  profilePic: {
    type: String,
    Default:"/images/default.png"
  },
  role:{
    type:String,
    default: "user",
  },
  slotIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'slots' 
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
