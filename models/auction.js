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
        default: 0, // Initialize with 0 buyers
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
    aadhaar_number:{
        type :String ,
    }
})

// Define a pre 'save' middleware to update numberOfBuyers based on buyerIDs count
auctionSchema.pre('save', async function (next) {
    try {
      // Count the number of buyers in the buyerIDs array
      this.numberOfBuyers = this.buyerIDs.length;
      return next();
    } catch (error) {
      return next(error);
    }
  });

module.exports = mongoose.model("Auction",auctionSchema)