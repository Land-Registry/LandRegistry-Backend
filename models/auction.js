const mongoose = require('mongoose')

const auctionSchema = new mongoose.Schema({
    propertyID: {
        type: Number,
        required: true,
        ref: 'SellingLand',
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    numberOfBuyers: {
        type: Number,
    },
    buyerIDs: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String, // "scheduled", "completed"
        default: "scheduled"
    }
})

module.exports = mongoose.model("Auction",auctionSchema)