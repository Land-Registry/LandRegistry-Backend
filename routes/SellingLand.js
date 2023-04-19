const express = require('express')
const router = express.Router() 
const SellingLand = require('../models/SellingLand')

router.get('/', async(req, res) => {

    res.set({
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS'
    });
    try {
        const details = await SellingLand.find()
        res.status(200).json(details)
    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post('/', async(req, res) => {

    res.set({
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS'
    });

    if(!req.body.owner || !req.body.propertyID){
        res.status(400).send({
            "message": "Please enter the required fields"
        })
    }
    try {
        var land_details = {
            owner: req.body.owner,
            request: req.body.request,
            propertyID: req.body.propertyID,
            physicalSurveyNo: req.body.physicalSurveyNo,
            tokenID: req.body.tokenID,
            Area: req.body.Area,
            ownerAddress: req.body.ownerAddress,
            Buyer_name: req.body.Buyer_name,
            InspectorName: req.body.InspectorName,
            Buyer_address: req.body.Buyer_address,
            Document_Access: req.body.Document_Access,
            tokensend: req.body.tokensend,
            Document_Verify: req.body.Document_Verify,
            Transaction: req.body.Transaction,
            Ownership_Transfer: req.body.Ownership_Transfer,
            Price: req.body.Price,
            ImageURL: req.body.ImageURL,
        }
        const details = new SellingLand(land_details)
        await details.save()
        res.status(200).send({
            "message": "Land Details saved successfully"
        })
    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

module.exports = router