const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Image must have URL"],
    },
    description: {
        type: String,
        default: "Image Description is unavailable",
        trim: true
    },
    caption: {
        type: String,
        default: "Image Caption is unavailable",
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Images must have an associated user.']
    },
    dateUpload: {
        type: Date,
        default: Date.now(),
        required: [true, "Image upload date must be recorded."],
    },
    fileType: {
        type: String,
        default: "N/A",
    },
    fileSize: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    }
});

const ResourceSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, "A Resource must have a name"],
        unique: true,
        minlength: 5
    },
    type: {
        type: String,
        default: "Resource",
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    caption: {
        type: String,
        trim: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: [true, 'Resources must have a location']
    },
    address: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['open', 'closed', 'at-capacity', 'permanently-closed', 'temporarly-closed'],
        trim: true
    },
    allocationFinite: {
        type: Boolean,
        default: true,
        required: [true, "Does this resource have a member capacity?"]
    },
    allocated: {
        type: Number,
        default: 0,
    },
    capacity: {
        type: Number,
        default: 0,
    },
    allocatedMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
        }
    ],
    mainImageUrl: {
        type: String,
        default: 'defaultResource.jpg'
    },
    galleryImages: [ImageSchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Resources must have an owner']
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
})

const Resource = mongoose.model("Resource", ResourceSchema);

module.exports = Resource;