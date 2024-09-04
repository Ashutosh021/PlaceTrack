const express = require("express");
const userRouter = express.Router();
const {signupForm,userSignup,loginForm,userLogin,userHome,history,historyDetails} = require('../controller/user');
const upload = require('../middleware/upload')
const isLoggedIn = require('../middleware/isLoggedIn');


userRouter.get('/',isLoggedIn,userHome);

userRouter.get('/login',loginForm);
userRouter.post('/login',userLogin);

userRouter.get('/signup',signupForm);
userRouter.post('/signup',upload.single('profilePic'),userSignup);

userRouter.get('/history',isLoggedIn,history);
userRouter.get('/history/details/:Id',isLoggedIn,historyDetails);


module.exports = userRouter;