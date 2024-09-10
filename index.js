const express = require("express");
const app = express();
const path = require("path");
const connectDB = require('./config/db')
const userRouter = require('./routes/user')
const slotRouter = require('./routes/slot')
const profileRouter = require('./routes/profile')
const adminRouter = require('./routes/admin')
const adminProfileRouter = require('./routes/adminProfile')


require('dotenv').config()
const PORT = process.env.PORT;
connectDB();
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
const cookieParser = require("cookie-parser");
app.use(cookieParser());


app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname,'/public')));


app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/register-admin',(req,res)=>{
    res.render('registerAdmin');
})

app.use('/register-user',(req,res)=>{
    res.render('registerUser');
})

app.use('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect('/');
})


app.use('/api/v1/user',userRouter);
app.use('/api/v1/user/profile',profileRouter);
app.use('/api/v1/slot',slotRouter);
app.use('/api/v1/profile',profileRouter);

//admin routes
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/admin/profile',adminProfileRouter);




app.use('/api/v1/user/*',(req,res)=>{
    res.render('errorUser');
})

app.use('/api/v1/admin/*',(req,res)=>{
    res.render('errorAdmin');
})


app.use('*',(req,res)=>{
    res.render('error');
})


app.listen(PORT,(req,res)=>{
    console.log(`http://localhost:${PORT}`)
});
