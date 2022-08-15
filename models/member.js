const mongoose = require('mongoose');
const validator = require('validator');

const MemberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: [true, "Members must have a member name."],
        unique: true,
        minlength: 5
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a last name"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        default: "No email provided.",
    },
    phone: {
        type: String,
        default: "No phone number provided.",
    },
    status: {
        type: String,
        default: 'Unknown'
    },
    dateOfBirth: {
        type: Date,
        default: Date.now(),
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'transgender', 'trans female', 'trans male', 'intersex', 'undisclosed'],
        default: 'undisclosed'
    },
    pronouns: {
        type: String,
        default: 'N/A'
    },
    occupation: {
        type: String,
        default: 'N/A'
    },
    veteranStatus: {
        type: String,
        enum: ['active', 'discharge', 'not a veteran'],
        default: 'not a veteran'
    },
    housingSituation: {
        type: String,
        default: 'N/A'
    },
    householdIncome: {
        type: Number,
        default: 0,
    },
    medicalConditions: [
       {
        type: String,
        default: "None"
       }
    ],
    allocatedResources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource"
        }
    ],
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: [true, 'Users must have a location']
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        select: false
    },
    lastModified: {
        type: Date,
        default: Date.now(),
        select: false
    }
});


const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;