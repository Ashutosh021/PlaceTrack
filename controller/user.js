const userModel = require("../schema/user");
const slotModel = require("../schema/slot");
const cloudinary = require('../config/cloudinary');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const userHome = async (req, res) => {
  const { email, password } = req.user;

  try {
    const user = await userModel.findOne({ email }).populate({
      path: 'slotIds',
      options: { sort: { createdAt: -1 } } // Sort slots by createdAt in descending order
    }).exec();
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Home",
      });
    }
    res.render("userHome", { user });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginForm = (req, res) => {
  res.render("login", { error: null });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.render("userLogin", {
        error: "Email or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Email or password is incorrect",
      });
    }

    let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res.redirect("/api/v1/user");
  } catch (err) {
    console.error("Error during login:", err);
    return res.render("userLogin", {
      error: "Internal server error. Please try again later.",
    });
  }
};


const signupForm = (req, res) => {
  res.render("userSignup", { error: null }); // Initially, no error
};

const userSignup = async (req, res) => {
  const { name, email, password, phone, section, batch } = req.body;

  if (!req.file) {
    return res.render("userSignup", {
      error: "Profile picture is required.",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "PlaceTrack",
    });

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      section,
      batch,
      profilePic: uploadResult.secure_url,
    });

    let token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    return res.redirect("/api/v1/user/");
  } catch (err) {
    console.error("Error during signup:", err);

    if (err.code === 11000) {
      // Handle duplicate email error
      let error = err.keyValue.email?err.keyValue.email:err.keyValue.phone
      return res.render("userSignup", {
        error: error +' already exits',
      });
    }

    return res.render("userSignup", {
      error: "Internal server error. Please try again later.",
    });
  }
};

const history = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await userModel.findOne({ email }).populate({
      path: 'slotIds',
      options: { sort: { createdAt: -1 } } // Sort slots by createdAt in descending order
    }).exec();
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "History Page",
      });
    }
    res.render("userHistory", { user });
  } catch (err) {
    console.error("Error during fetching history:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const historyDetails = async(req, res) => {
  const { Id } = req.params; // Destructure slotId correctly from req.params

  try {
      const slot = await slotModel.findById(Id); // Use await to handle the promise

      if (!slot) {
          return res.status(404).json({
              success: false,
              message: 'Slot not found'
          });
      }

      res.render('userHistoryDetail', { slot }); // Pass the slot as an object to the render method
  } catch (err) {
      console.error('Error fetching slot:', err);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: err.message
      });
  }
};


module.exports = {
  loginForm,
  userLogin,
  signupForm,
  userSignup,
  userHome,
  history,
  historyDetails,
};
