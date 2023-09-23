const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
    },
    aadharNo: {
        type: Number,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: Number,
    },
    metamaskAddress: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("User",userSchema)