const mongoose = require('mongoose')

const purchaseRequestSchema = new mongoose.Schema({
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    propertyID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    timeofRequest: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("PurchaseLand",purchaseRequestSchema)