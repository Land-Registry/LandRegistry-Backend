const express = require("express");
const router = express.Router();
const UserDetails = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const { aadhaar_number } = req.body;

        // Check if aadhaar_number already exists in the database
        const existingUser = await UserDetails.findOne({ aadhaar_number });

        if (existingUser) {
            return res.status(200).send({
                "message": "User with the same Aadhaar number already exists"
            });
        }

        const details = new UserDetails(req.body);
        await details.save();

        console.log(details);

        return res.status(200).send({
            "message": "User Details saved successfully"
        });
    } catch (error) {
        return res.status(400).send({
            "message": "Error " + error.message
        });
    }
});

module.exports = router;
