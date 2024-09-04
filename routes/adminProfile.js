const express = require("express");
const adminProfileRouter = express.Router();
const {getProfile,updateProfile} = require('../controller/adminProfile');
const isLoggedIn = require('../middleware/isLoggedIn')
const isAdmin = require('../middleware/isAdmin')


adminProfileRouter.get('/',isLoggedIn,isAdmin,getProfile);
adminProfileRouter.post('/update/:Id',isLoggedIn,isAdmin,updateProfile);



module.exports = adminProfileRouter;