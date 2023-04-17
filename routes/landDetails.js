const express = require('express')
const router = express.Router() 
const LandDetails = require('../models/landDetails')

router.get('/', async(req, res) => {
    try {
        const details = await LandDetails.find()
        res.status(200).json(details)
    } catch (error) {
        res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post('/', async(req, res) => {
    if(!req.body.owner || !req.body.propertyID){
        res.status(400).send({
            "message": "Please enter the required fields"
        })
    }
    try {
        var land_details = {
            owner: req.body.owner,
            areaOfLand: req.body.areaOfLand,
            pricePerSqFeet: req.body.pricePerSqFeet,
            propertyID: req.body.propertyID,
            physicalSurveyNo: req.body.physicalSurveyNo,
            city: req.body.location.city,
        }
        if(req.body.location != null){
            land_details.area = req.body.location.area
            land_details.city = req.body.location.city
            land_details.state = req.body.location.state
        }
        const details = new LandDetails(land_details)
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