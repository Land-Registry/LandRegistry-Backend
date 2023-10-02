const express = require("express");
const router = express.Router();
const Auction = require("../models/auction");
const PurchaseRequest = require("../models/purchaseRequest");
const SellingLand = require("../models/SellingLand")

// Schedule an auction
router.post("/", async (req, res) => {
    res.set({
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT,OPTIONS",
    });
  
    try {
      const details = new Auction(req.body);
      await details.save();

      await SellingLand.findOneAndUpdate(
        { propertyID: req.body.propertyID },
        { auctioncreated: true },
        // {Price: req.body.StartPrice}
      );

      return res.status(200).send({
        message: "Auction saved successfully",
      });
    } catch (error) {
      return res.status(400).send({
        message: "Error " + error.message,
      });
    }
  });

router.post("/data", async (req, res) => {
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

        var buyerIDs = purchaseRequests.map((purchaseRequest) => purchaseRequest.buyerID);

        for (var i = 0; i < purchaseRequests.length; i++) {
            purchaseRequests[i].status = "accepted";
            await purchaseRequests[i].save();
        }

        const auction = new Auction({
            propertyID: req.body.propertyID,
            sellerID: req.body.sellerID,
            date: req.body.date,
            numberOfBuyers: purchaseRequests.length,
            status: "scheduled",
            buyerIDs: buyerIDs,
            roomID: req.body.roomID, // Include roomID
            roomCreated: req.body.roomCreated, // Include roomCreated
        });

        await auction.save();

        return res.status(200).send({
            message: "Auction scheduled successfully",
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error " + error.message,
        });
    }
});

// Update auction data by ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const auction = await Auction.findByIdAndUpdate(id, updates, { new: true });

        if (!auction) {
            return res.status(404).send({
                message: "Auction not found",
            });
        }

        return res.status(200).json(auction);
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