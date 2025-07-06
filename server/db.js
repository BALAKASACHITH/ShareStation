const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/sharestation');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB not connected');
    }
};
connectDB();