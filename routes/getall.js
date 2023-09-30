const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import your Mongoose models here
const Auction = require('../models/auction');
const LandDetails = require('../models/landDetails');
const PurchaseRequest = require('../models/purchaseRequest');
const SellingLand = require('../models/SellingLand');
const User = require('../models/user');
const UserDetails = require('../models/userDetails');

router.get('/get-data-by-aadhar/:aadhar', async (req, res) => {
    try {
        const aadhar = req.params.aadhar;

        // Use Mongoose's populate() method to fetch data with references
        const userData = await User.findOne({ aadhar }).exec();

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(userData._id.toString())

        // Fetch related data using references
        const auctionData = await Auction.find({ sellerID: userData._id }).exec();
        const purchaseRequestData = await PurchaseRequest.find({ buyerID: userData._id }).exec();
        const sellingLandData = await SellingLand.find({ aadhar }).exec();

        // Fetch LandDetails data by aadhar
        const landDetailsData = await LandDetails.find({ aadhar }).exec();

        res.status(200).json({
            user: userData,
            auctions: auctionData,
            purchaseRequests: purchaseRequestData,
            sellingLand: sellingLandData,
            landDetails: landDetailsData, // Include LandDetails data
            // Add more data as needed
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update the route to fetch all data without filtering by Aadhar
router.get('/get-all-data', async (req, res) => {
    try {
        // Fetch all user data
        const allUserData = await User.find().exec();

        // Fetch all auction data
        const allAuctionData = await Auction.find().exec();

        // Fetch all purchase request data
        const allPurchaseRequestData = await PurchaseRequest.find().exec();

        // Fetch all selling land data
        const allSellingLandData = await SellingLand.find().exec();

        // Fetch all land details data
        const allLandDetailsData = await LandDetails.find().exec();

        res.status(200).json({
            allUsers: allUserData,
            allAuctions: allAuctionData,
            allPurchaseRequests: allPurchaseRequestData,
            allSellingLand: allSellingLandData,
            allLandDetails: allLandDetailsData, 
            // Add more data as needed
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;