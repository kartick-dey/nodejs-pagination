const mongoose = require('mongoose');

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true        
    },
    lastName: {
        type: String,
        required: true        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

userSchema.index({ email: true });

/**
 * User model exporting
 */
module.exports = mongoose.model('users', userSchema);
module.exports = mongoose.model('users');