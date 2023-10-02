const mongoose = require('mongoose')

const auctionSchema = new mongoose.Schema({
    roomID:{
        type: String,
    },
    roomCreated:{
        type:Boolean,
        default:false,
    },
    owner:{
        type :String ,
    },
    StartPrice:{
        type:Number
    },
    propertyID: {
        type: Number,
        required: true,
        ref: 'SellingLand', 
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
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
    },
    status: {
        type: String, // "scheduled", "completed"
        default: "scheduled"
    },
    aadhar:{
        type :Number ,
    }
})

module.exports = mongoose.model("Auction",auctionSchema)