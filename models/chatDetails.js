const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    Name: {
        type:String,
    },
    aadhaar_number:{
        type:Number,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    propertyID: {
        type: Number,
    },
    highestBid:{
        type:Number
    }
})

module.exports = mongoose.model("Chats",chatSchema)