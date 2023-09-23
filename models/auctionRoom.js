const mongoose = require('mongoose')

const auctionRoomSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
        unique: true,
    },
    propertyID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    numberOfBuyers: {
        type: Number,
    },
    buyerIDs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    ],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("AuctionRoom",auctionRoomSchema)