const express=require("express");
const cors=require("cors");
require("./db");
const User=require("./models/User.js");
const Otp=require("./models/Otp.js");
const nodemailer = require("nodemailer");
const dotenv=require("dotenv");
dotenv.config({path:"../.env"});
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send("hello how are you");
})
app.post("/checkuser", async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error("Error checking user:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
const sendOTP = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    let mailOptions = {
        from: "ShareStation <sachithbalaka@gmail.com>",
        to: email,
        subject: "ShareStation Sign-Up OTP Verification",
        text: `Your OTP is: ${otp}`
    };
    return transporter.sendMail(mailOptions);
};

app.post("/updateotp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        await Otp.findOneAndUpdate(
            { email },
            { otp },
            { upsert: true, new: true }
        );
        await sendOTP(email, otp);
        return res.json({ sent: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error updating/sending OTP:", error.message);
        return res.json({ sent: false, message: "Failed to send OTP" });
    }
});

app.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const record = await Otp.findOne({ email, otp });
        if (record) {
            return res.json({ matched: true });
        } else {
            return res.json({ matched: false });
        }
    } catch (err) {
        console.error("Error verifying OTP:", err.message);
        return res.status(500).json({ matched: false, message: "Server error" });
    }
});

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({
            username: name,
            email: email,
            password: password
        });
        await newUser.save();
        return res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (user.password !== password) {
            return res.json({ success: false, message: "Wrong password" });
        }
        return res.json({ success: true, name:user.username });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

app.listen(2000,()=>{
    console.log("server is running on port 2000");
})