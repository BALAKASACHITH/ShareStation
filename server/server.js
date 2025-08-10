const express=require("express");
const cors=require("cors");
require("./db");
const path = require("path");
const User=require("./models/User.js");
const Otp=require("./models/Otp.js");
const Item=require("./models/Item.js");
const Request=require("./models/Request.js");
const nodemailer = require("nodemailer");
const multer = require("multer");
const dotenv=require("dotenv");
const fs = require('fs');
dotenv.config({path:"../.env"});
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${req.body.itemName}${ext}`);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const { from,itemName, rentPerDay } = req.body;
        const imagePath = `/uploads/${req.file.filename}`;

        const newItem = new Item({
            from,
            itemName,
            rentPerDay,
            imagePath,
        });

        await newItem.save();
        res.json({ message: "Upload successful" });
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ error: "Upload failed" });
    }
});

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

app.get("/getData",async (req,res)=>{
    try{
        const data=await User.find();
        res.json({d:data});
    }catch(e){
        res.json({error:e});
    }
})

app.get("/getItem",async(req,res)=>{
    try{
        const items=await Item.find();
        res.json({d:items});
    }catch(e){
        res.json({error:e});
    }
})

app.post("/submitRequest", async (req, res) => {
    try {
        const { itemName, to, from, daysNeeded, contact, location } = req.body;
        const newRequest = new Request({
            itemName,
            to,
            from,
            daysNeeded,
            contact,
            location
        });
        await newRequest.save();
        res.status(200).json({ success: true, message: "Request submitted successfully" });
    } catch (error) {
        console.error("Error submitting request:", error);
        res.status(500).json({ success: false, message: "Failed to submit request" });
    }
});
app.get('/requests', async (req, res) => {
    try {
        const allRequests = await Request.find();
        res.json(allRequests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});


app.delete("/delete-item", async (req, res) => {
    try {
        const { itemName, from } = req.body;
        
        // Find the item to get the image path
        const item = await Item.findOne({ itemName, from });
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        // Delete the image file from server
        const imagePath = path.join(__dirname, item.imagePath);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete item from database
        await Item.deleteOne({ itemName, from });

        // Delete all related requests
        await Request.deleteMany({ itemName, to: from });

        res.json({ message: "Item and related requests deleted successfully" });
    } catch (error) {
        console.error("Delete failed:", error);
        res.status(500).json({ error: "Delete failed" });
    }
});
app.listen(2000,()=>{
    console.log("server is running on port 2000");
})