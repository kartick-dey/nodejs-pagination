const mongoose = require('mongoose');

const randomUserModel = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
    
}, { timestamps: true});

randomUserModel.index({email: true})

module.exports = mongoose.model('randomusers', randomUserModel);