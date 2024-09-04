const userModel = require("../schema/user"); // Ensure the path is correct

const getProfile =  async(req, res) => {
  const {email}=req.user;
   try {
      const user = await userModel.findOne({email});
      res.render('userProfile', { user });
    } catch (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  const updateProfile = async (req, res) => {
    const { name, email, phone, section, batch } = req.body;
    const { userId } = req.params;
  
    try {
      const user = await userModel.findOneAndUpdate(userId, {
        name, email, phone, section, batch
      }, { new: true });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.redirect('/api/v1/user/profile');
    } catch (err) {
      console.error("Error updating user data:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  
  module.exports = {
    getProfile,
    updateProfile
  };
  