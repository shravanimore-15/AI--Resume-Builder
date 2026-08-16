const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{ 
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: ""
    }, 
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

module.exports = User;