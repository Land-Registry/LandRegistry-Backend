const mongoose  = require('mongoose');

const landDetailsSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    location: {
        area: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        }
    },
    areaOfLand: {
        type: Number,
    },
    pricePerSqFeet: {
        type: Number,
    },
    propertyID: {
        type: Number,
        required: true,
        unique: true,
    },
    physicalSurveyNo: {
        type: Number,
    },
})

module.exports = mongoose.model('LandDetails', landDetailsSchema);