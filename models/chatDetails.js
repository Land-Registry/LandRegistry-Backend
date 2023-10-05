const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    auctionID: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Chats",chatSchema)