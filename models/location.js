const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, "Location must have a name"],
        trim: true
    },
    resourceCount: {
        type: Number,
        required: [true, "Locations must have a resource count"],
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: [true, "Location creation must record date"],
    }
});


const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;