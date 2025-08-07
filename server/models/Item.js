const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    from:String,
    itemName: String,
    rentPerDay: String,
    imagePath: String
});

module.exports = mongoose.model("Item", itemSchema);