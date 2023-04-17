const mongoose  = require('mongoose');

const SellingLandSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    request:{
        type: Boolean,
        default: false,
    },
    propertyID: {
        type: Number,
        required: true,
        unique: true,
    },
    physicalSurveyNo: {
        type: Number,
    },
    tokenID:{
        type: String,
    },
    Area:{
        type: Number,
    },
    ownerAddress:{
        type: String,
    },
    Buyer_name:{
        type: String,
    },InspectorName:{
        type: String,
    },
    Buyer_address:{
        type: String,
    },
    Document_Access: {
        type: String,
    },
    tokensend:{
        default: "wait",
        type: String,
    },
    Document_Verify:{
        default: "wait",
        type: String,
    },
    Transaction:{
        default: "wait",
        type: String,
    },
    Ownership_Transfer:{
        default: "wait",
        type: String,
    },
    Price:{
        type: Number,
    },
    ImageURL:{
        type: String,
    }

})

module.exports = mongoose.model('SellingLand', SellingLandSchema);