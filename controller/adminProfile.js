const adminModel = require("../schema/admin"); // Ensure the path is correct

const getProfile =  async(req, res) => {
  const {email}=req.user;
   try {
      const user = await adminModel.findOne({email});
      res.render('adminProfile', { user });
    } catch (err) {
      console.error("Error fetching admin data:", err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  const updateProfile = async (req, res) => {
    const { name, email, adminCode} = req.body;
    const { userId } = req.params;
  
    try {
      const user = await adminModel.findOneAndUpdate(userId, {
        name, email, adminCode
      }, { new: true });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.redirect('/api/v1/admin/profile');
    } catch (err) {
      console.error("Error updating admin data:", err);
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
  