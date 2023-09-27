const express = require("express");
const router = express.Router();
const PurchaseRequest = require("../models/purchaseRequest");


router.get("/pending/:sellerID", async (req, res) => {
    res.set({
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
    });
    
    try {
        const details = await PurchaseRequest.find({
            sellerID: req.params.sellerID,
            status: "pending",
        });
        return res.status(200).json(details);
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});


router.get("/accepted/:sellerID", async (req, res) => {
    res.set({
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
    });
    
    try {
        const details = await PurchaseRequest.find({
            sellerID: req.params.sellerID,
            status: "accepted",
        });
        return res.status(200).json(details);
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

router.get("/rejected/:sellerID", async (req, res) => {
    res.set({
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
    });
    
    try {
        const details = await PurchaseRequest.find({
            sellerID: req.params.sellerID,
            status: "rejected",
        });
        return res.status(200).json(details);
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

router.post("/", async (req, res) => {
    res.set({
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
    });
    
    if (!req.body.buyerID || !req.body.sellerID || !req.body.propertyID) {
        return res.status(400).send({
            message: "Please enter the required fields",
        });
    }
    try {
        var purchaseRequest = {
            buyerID: req.body.buyerID,
            sellerID: req.body.sellerID,
            propertyID: req.body.propertyID,
        };
        const details = new PurchaseRequest(purchaseRequest);
        await details.save();
        return res.status(200).json(details);
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

module.exports = router;