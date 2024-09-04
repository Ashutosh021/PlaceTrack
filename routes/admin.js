const express = require("express");
const adminRouter = express.Router();
const {signupForm,adminSignup,loginForm,adminLogin,slotData,slotDataDetails,downloadPage} = require('../controller/admin');
const upload = require('../middleware/upload')
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');

adminRouter.get('/',isLoggedIn,isAdmin,slotData)
adminRouter.get('/login',loginForm).post('/login',adminLogin);
adminRouter.get('/signup',signupForm).post('/signup',upload.single('profilePic'),adminSignup);
adminRouter.get('/download',downloadPage);
adminRouter.get('/slotdata/details/:Id',isLoggedIn,isAdmin,slotDataDetails);


module.exports = adminRouter;