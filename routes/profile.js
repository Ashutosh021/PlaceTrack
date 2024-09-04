const express = require("express");
const profileRouter = express.Router();
const {getProfile,updateProfile} = require('../controller/profile');
const isLoggedIn = require('../middleware/isLoggedIn')


profileRouter.get('/',isLoggedIn,getProfile);
profileRouter.post('/update/:Id',isLoggedIn,updateProfile);


module.exports = profileRouter;