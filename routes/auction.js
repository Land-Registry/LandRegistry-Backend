const express = require("express");
const router = express.Router();
const Auction = require("../models/auction");
const PurchaseRequest = require("../models/purchaseRequest");

//	Schedule an auction
router.post("/", async (req, res) => {
    if (!req.body.propertyID || !req.body.sellerID || !req.body.date) {
        return res.status(400).send({
            message: "Please enter the required fields",
        });
    }

    try {
        var purchaseRequests = await PurchaseRequest.find({
            propertyID: req.body.propertyID,
            status: "pending",
        });

        // if (purchaseRequests.length < 2) {
        //     return res.status(400).send({
        //         message: "Not enough purchase requests",
        //     });
        // }

        var buyerIDs = [];
        for (var i = 0; i < purchaseRequests.length; i++) {
            buyerIDs.push(purchaseRequests[i].buyerID);
        }

        var auction = {
            propertyID: req.body.propertyID,
            sellerID: req.body.sellerID,
            date: req.body.date,
            numberOfBuyers: purchaseRequests.length,
            status: "scheduled",
            buyerIDs: buyerIDs,
        };

        for(var i = 0; i < purchaseRequests.length; i++){
            purchaseRequests[i].status = "accepted";
            await purchaseRequests[i].save();
        }

        const details = new Auction(auction);

        await details.save();

        return res.status(200).send({
            message: "Auction scheduled successfully",
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

// List all upcoming auctions for all users
router.get("/upcoming", async (req, res) => {
    if(!req.body.sellerID && !req.body.buyerID){
        return res.status(400).send({
            message: "Please enter sellerID or buyerID",
        });
    }

    try {
        if (req.body.sellerID) {
            const details = await Auction.find({
                sellerID: req.body.sellerID,
                status: "scheduled",
            });
            return res.status(200).json(details);
        }

        if (req.body.buyerID) {
            const details = await Auction.find({
                buyerIDs: req.body.buyerID,
                status: "scheduled",
            });
            return res.status(200).json(details);
        }
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

// Fetch past auctions for a particular user 
router.get("/past", async (req, res) => {
    if(!req.body.sellerID && !req.body.buyerID){
        return res.status(400).send({
            message: "Please enter sellerID or buyerID",
        });
    }

    try {
        if (req.body.sellerID) {
            const details = await Auction.find({
                sellerID: req.body.sellerID,
                status: "completed",
            });
            return res.status(200).json(details);
        }

        if (req.body.buyerID) {
            const details = await Auction.find({
                buyerIDs: req.body.buyerID,
                status: "completed",
            });
            return res.status(200).json(details);
        }
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

module.exports = router