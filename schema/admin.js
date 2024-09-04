const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
  profilePic: {
    type: String,
    default:"/images/default.png"
  },
  adminCode: {
  type: String,
  match: [/^(MCA345|MCA678|MCA890)$/, 'Invalid admin code! Enter a Valid Code.'],
  required: [true, 'Admin code is required']
},
  role:{
    type:String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
