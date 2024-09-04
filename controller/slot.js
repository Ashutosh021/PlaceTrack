const slotModel = require("../schema/slot"); // Ensure the path is correct
const cloudinary = require("../config/cloudinary");
const userModel = require("../schema/user");


const slotForm = (req, res) => {
  res.render("slot",{slot:null});
};

const createSlot = async (req, res) => {
  const {email} = req.user;
  let user = await userModel.findOne({email});
  const {
    companyName,
    companyCity,
    reportingTime,
    reportingDate,
    realTimeLocation
  } = req.body;

  try {
    const newSlot = await slotModel.create({
      companyName,
      companyCity,
      locationPic:"null",
      reportingDate,
      reportingTime,
      realTimeLocation,
      userId:user._id
    });
    await user.slotIds.push(newSlot._id);
    await user.save();
  
    res.redirect('/api/v1/user')
  } catch (err) {
    // Handle any errors that occurred during user creation
    console.error("Error creating slot:", err);
    res.status(500).json({
      success: false,
      message: "Error creating slot",
      error: err.message,
    });
  }
};

const editSlotForm = async (req, res) => {
  const { Id } = req.params; // Destructure slotId correctly from req.params

  try {
      const slot = await slotModel.findById(Id); // Use await to handle the promise

      if (!slot) {
          return res.status(404).json({
              success: false,
              message: 'Slot not found'
          });
      }

      res.render('slot', { slot }); // Pass the slot as an object to the render method
  } catch (err) {
      console.error('Error fetching slot:', err);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: err.message
      });
  }
};


const updateSlot = async (req, res) => {
  const {
    companyName,
    companyCity,
    reportingTime,
    reportingDate,
  } = req.body;
  const { Id } = req.params;


  try {
    // Update the slot with the provided details
    const updatedSlot = await slotModel.findByIdAndUpdate(Id, {
      companyName,
      companyCity,
      reportingTime,
      reportingDate,
    }, { new: true });

    if (!updatedSlot) {
      console.log('Slot not found');
      return res.status(404).json({
        success: false,
        message: 'Slot not found',
      });
    }

    res.redirect('/api/v1/user');
  } catch (err) {
    // Handle any errors that occurred during the update
    console.error('Error updating slot:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating slot',
      error: err.message,
    });
  }
};

const validateForm = async (req, res) => {
  const { Id } = req.params; // Destructure slotId correctly from req.params

  try {
      const slot = await slotModel.findById(Id); // Use await to handle the promise

      if (!slot) {
          return res.status(404).json({
              success: false,
              message: 'Slot not found'
          });
      }

      res.render('verifyLocation', { slot }); // Pass the slot as an object to the render method
  } catch (err) {
      console.error('Error fetching slot:', err);
      return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: err.message
      });
  }
};


const validate = async (req, res) => {
  const {
    companyName,
    realTimeLocation
  } = req.body;
  const { Id } = req.params;


  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "PlaceTrack",
    });
    
    // Update the slot with the provided details and the address string
    const updatedSlot = await slotModel.findByIdAndUpdate(Id, {
      companyName,
      locationPic:uploadResult.secure_url,
      realTimeLocation
    }, { new: true });

    if (!updatedSlot) {
      console.log('Slot not found');
      return res.status(404).json({
        success: false,
        message: 'Slot not found',
      });
    }

    res.redirect('/api/v1/user');
  } catch (err) {
    // Handle any errors that occurred during the update
    console.error('Error updating slot:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating slot',
      error: err.message,
    });
  }
};



module.exports = {
  slotForm,
  createSlot,
  editSlotForm,
  updateSlot,
  validateForm,
  validate
};
