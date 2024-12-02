const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('DB Error:', err);
        process.exit(1);
    }
}; 

module.exports = connectDB;