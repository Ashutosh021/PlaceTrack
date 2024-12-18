const adminModel = require("../schema/admin");
const userModel = require("../schema/user");
const slotModel = require("../schema/slot");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const loginForm = (req, res) => {
  res.render("adminLogin",{error:null});
};


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(400).render("adminLogin", {
        error: "Email or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("adminLogin", {
        error: "Email or password is incorrect",
      });
    }

    let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res.redirect("/api/v1/admin");
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).render("adminLogin", {
      error: "Internal server error. Please try again later.",
    });
  }
};



const signupForm = (req, res) => {
  res.render("adminSignup",{error:null});
};

const adminSignup = async (req, res) => {
  const { name, email, password, adminCode } = req.body;

  if (!req.file) {
    return res.status(400).render("adminSignup", {
      error: "No profile picture uploaded. Please upload a file.",
    });
  }

  try {
    // Check if the user already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).render("adminSignup", {
        error: "An account with this email already exists. Please log in.",
      });
    }

    // Validate admin code
    if (adminCode !== process.env.ADMIN_SECRET) {
      return res.status(403).render("adminSignup", {
        error: "Invalid admin code.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload profile picture to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "PlaceTrack",
    });

    // Create new admin
    const newAdmin = await adminModel.create({
      name,
      email,
      password: hashedPassword,
      profilePic: uploadResult.secure_url,
      adminCode,
    });

    // Generate JWT token
    const token = jwt.sign({ email: newAdmin.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie and redirect
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    return res.redirect("/api/v1/admin/");
  } catch (err) {
    console.error("Error during signup:", err);

    const errorMessage =
      err.code === 11000 && "Admin Code is Invalid. || Enter a Valid Code"

    return res.status(500).render("adminSignup", {
      error: errorMessage,
    });
  }
};




const slotData = async (req, res) => {
  try {
    const { batch, section } = req.query;
    const query = {};

    if (batch) {
      query.batch = batch;
    }

    if (section) {
      query.section = section;
    }

    const users = await userModel.find(query).populate({
      path: 'slotIds',
      options: { sort: { createdAt: -1 } }
    }).exec();

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "No users found",
      });
    }

    res.render("adminHome", { users, selectedBatch: batch, selectedSection: section });
  } catch (err) {
    console.error("Error during fetching history:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




const slotDataDetails = async(req, res) => {
  const { Id } = req.params; // Destructure slotId correctly from req.params

  try {
      const user = await userModel.findById(Id).populate('slotIds').exec(); // Use await to handle the promise
      if (!user) {
          return res.status(404).json({
              success: false,  
              message: 'Slot not found'
          });
      }

      res.render('adminSlotDataDetails', { user }); // Pass the slot as an object to the render method
  } catch (err) {
      console.error('Error fetching slot:', err);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: err.message
      });
  }
};


const downloadPage = async (req, res) => {
  try {
    const { batch, section } = req.query;
    const userQuery = {};

    if (batch) {
      userQuery.batch = batch;
    }

    if (section) {
      userQuery.section = section;
    }

    // Find users matching the batch and section criteria
    const users = await userModel.find(userQuery).populate('slotIds').exec();
    const userIds = users.map(user => user._id);

    // Find slots associated with the found users
    const slots = await slotModel.find({ userId: { $in: userIds } }).populate('userId').sort({ createdAt: -1 }).exec();

    if (!slots || slots.length === 0) {
      return res.render("adminDownload", { slots: [], selectedBatch: batch, selectedSection: section, message: "No data available for the selected batch and section." });
    }

    res.render("adminDownload", { slots, selectedBatch: batch, selectedSection: section });
  } catch (err) {
    console.error("Error during fetching history:", err);
    return res.status(500).render("adminDownload", { slots: [], selectedBatch: batch, selectedSection: section, message: "Internal server error. Please try again later." });
  }
};




module.exports = {
  loginForm,
  adminLogin,
  signupForm,
  adminSignup,
  slotData,
  slotDataDetails,
  downloadPage,
};
