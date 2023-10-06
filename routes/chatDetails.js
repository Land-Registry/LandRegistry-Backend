const express = require('express');
const router = express.Router();
const User = require('../models/user');
// Import your Mongoose models here
const chatDetails = require('../models/chatDetails');

router.post("/", async (req, res) => {
    try {
        // Find user data based on aadhaar_number
        const userData = await User.findOne({ aadhaar_number: req.body.aadhaar_number }).exec();

        if (!userData) {
            return res.status(404).send({
                message: "User data not found for the provided aadhaar_number",
            });
        }

        // Store the user's full name in the req.body
        req.body.Name = userData.full_name;

        // Create a new ChatDetails document with the provided data
        const chatData = new chatDetails(req.body);
        await chatData.save();

        return res.status(200).send({
            message: "Chat message saved successfully",
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});


router.get("/", async(req, res) => {
    try {
        const { propertyID } = req.body;
        if(!propertyID) {
            return res.status(400).send({
                message: "Property ID not provided",
            });
        }

        const messages = await chatDetails.find({propertyID}).sort({ timestamp: 1});
        return res.status(200).json(messages)

    } catch (error) {
        return res.status(400).send({
          message: "Error " + error.message,
        });
    }
});



router.get("/highestBid", async (req, res) => {
    try {
        const propertyID = req.query.propertyID;
        if (!propertyID) {
            return res.status(400).send({
                message: "PropertyID not provided in query parameters",
            });
        }

        // Assuming you have a model for highest bids called 'Bid'
        const highestBid = await chatDetails
            .findOne({ propertyID })
            .sort({ highestBid: -1 }) // Sort by highestBid in descending order

        if (!highestBid) {
            return res.status(404).send({
                message: "Highest bid not found for the property",
            });
        }

        

        // console.log(highestBid)

        return res.status(200).json({ highestBid: highestBid.highestBid,Name:highestBid.Name,aadhaar_number:highestBid.aadhaar_number});
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

router.get("/property-chat", async (req, res) => {
    try {
        const { propertyID } = req.query;
        console.log(propertyID)
        if (!propertyID) {
            return res.status(400).send({
                message: "Property ID not provided in query parameters",
            });
        }

        // Fetch chat messages for the specified property ID and sort by timestamp
        const messages = await chatDetails.find({ propertyID }).sort({ timestamp: 1 });

        return res.status(200).json(messages);
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});


module.exports = router