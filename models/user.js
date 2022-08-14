const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Users must have a username."],
        unique: true,
        minlength: 5
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"]
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
        type: String,
        enum: ['admin', 'advocate', 'member', 'deleted'],
        default: 'advocate'
    },
    profileImageUrl: {
        type: String,
        default: 'defaultProfile.jpg'
    },
    affiliation: {
        type: String,
    },
    resources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource"
        }
    ],
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
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
    },
});



UserSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of BCRYPT_WORK_FACTOR
    this.password = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR);

    next();
});


UserSchema.methods.authenticate = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};



const User = mongoose.model("User", UserSchema);

module.exports = User;