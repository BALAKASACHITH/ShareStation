const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: String,
    rentPerDay: String,
    imagePath: String
});

module.exports = mongoose.model("Collection", itemSchema);