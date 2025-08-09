const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    itemName: String,
    to: String,
    from: String,
    daysNeeded: String,
    contact: String,
    location: String
});
module.exports = mongoose.model("Request", requestSchema);