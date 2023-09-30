const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    aadhar: {
        type: Number,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    metamaskAddress: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    address: {
        country: {
            type: String,
        },
        dist: {
            type: String,
        },
        state: {
            type: String,
        },
        po: {
            type: String,
        },
        loc: {
            type: String,
        },
        vtc: {
            type: String,
        },
        subdist: {
            type: String,
        },
        street: {
            type: String,
        },
        house: {
            type: String,
        },
        landmark: {
            type: String,
        },
    },
    face_status: {
        type: Boolean,
    },
    face_score: {
        type: Number,
    },
    zip: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    has_image: {
        type: Boolean,
    },
    email_hash: {
        type: String,
    },
    mobile_hash: {
        type: String,
    },
    raw_xml: {
        type: String,
    },
    zip_data: {
        type: String,
    },
    care_of: {
        type: String,
    },
    share_code: {
        type: String,
    },
    mobile_verified: {
        type: Boolean,
    },
    reference_id: {
        type: String,
    },
    aadhaar_pdf: {
        type: String,
    },
    status: {
        type: String,
    },
    uniqueness_id: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);
