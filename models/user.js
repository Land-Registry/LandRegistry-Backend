const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: Number,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: Number,
        required: true
    },
    metamaskAddress: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("User",userSchema)