const express = require('express');
const router = express.Router();

// Import your Mongoose models here
const chatDetails = require('../models/chatDetails');

router.post("/", async(req, res) => {
    try {
        const data = new chatDetails(req.body);
        await details.save();

        return res.status(200).send({
            message: "Auction saved successfully",
        });
    } catch (error) {
        return res.status(400).send({
          message: "Error " + error.message,
        });
    }
});

router.get("/", async(req, res) => {
    try {
        const { auctionID } = req.body;
        if(!auctionID) {
            return res.status(400).send({
                message: "Auction ID not provided",
            });
        }

        const messages = await chatDetails.find({auctionID}).sort({ timestamp: 1});
        return res.status(200).json(messages)

    } catch (error) {
        return res.status(400).send({
          message: "Error " + error.message,
        });
    }
});

module.exports = router