const mongoose = require('mongoose')

const purchaseRequestSchema = new mongoose.Schema({
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    aadhar:{
        type : String ,
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    propertyID: {
        type: Number,
        required: true,
        ref: 'SellingLand',
    },
    timeofRequest: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String, // "pending", "accepted", "rejected"
        default: "pending"
    }
})

module.exports = mongoose.model("PurchaseRequest",purchaseRequestSchema)