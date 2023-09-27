const express = require("express");
const router = express.Router();
const UserDetails = require("../models/userDetails");

router.post("/", async (req, res) => {
    if(!req.body.name || !req.body.phoneNo || !req.body.aadharNo){
        return res.status(400).send({
            "message": "Please enter the required fields"
        })
    }

    try{
        var user_details = {
            name: req.body.name,
            phoneNo: req.body.phoneNo,
            aadharNo: req.body.aadharNo,
        }
        const details = new UserDetails(user_details)
        await details.save()
        return res.status(200).send({
            "message": "User Details saved successfully"
        })
    } catch (error) {
        return res.status(400).send({
            "message": "Error "+ error.message
        })
    }
});

module.exports = router;