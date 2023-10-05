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
router.post("/add-buyer/:propertyId/:buyerId", async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      const buyerId = req.params.buyerId;
  
      // Find the auction by propertyID
      const auction = await Auction.findOne({ propertyID: propertyId });
  
      if (!auction) {
        return res.status(404).send({
          message: "Auction not found for the given propertyID",
        });
      }
  
      // Check if the buyerId already exists in the buyerIDs array
      if (auction.buyerIDs.includes(buyerId)) {
        return res.status(400).send({
          message: "BuyerID already exists in the auction",
        });
      }
  
      // Add the buyerID to the buyerIDs array
      auction.buyerIDs.push(buyerId);
  
      // Save the updated auction
      await auction.save();
  
      return res.status(200).send({
        message: "BuyerID added to the auction successfully",
      });
    } catch (error) {
      return res.status(400).send({
        message: "Error " + error.message,
      });
    }
  });
  
  router.delete("/remove-buyer/:auctionId/:buyerId", async (req, res) => {
    try {
      const auctionId = req.params.auctionId;
      const buyerId = req.params.buyerId;
  
      // Find the auction by its ID
      const auction = await Auction.findById(auctionId);
  
      if (!auction) {
        return res.status(404).send({
          message: "Auction not found",
        });
      }
  
      // Check if the buyerID exists in the buyerIDs array
      const indexOfBuyer = auction.buyerIDs.indexOf(buyerId);
      if (indexOfBuyer === -1) {
        return res.status(404).send({
          message: "Buyer ID not found in the auction",
        });
      }
  
      // Remove the buyerID from the buyerIDs array
      auction.buyerIDs.splice(indexOfBuyer, 1);
  
      // Update the numberOfBuyers field
      auction.numberOfBuyers = auction.buyerIDs.length;
  
      // Save the updated auction
      await auction.save();
  
      return res.status(200).send({
        message: "Buyer ID removed from the auction successfully",
      });
    } catch (error) {
      return res.status(400).send({
        message: "Error " + error.message,
      });
    }
  });

module.exports = router