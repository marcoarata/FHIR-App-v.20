// DB Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isDoctor: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        seenNotifications: {
            type: Array,
            default: [],
        },
        unseenNotifications: {
            type: Array,
            default: [],
        },
        patientId: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

// user model
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;