const express = require("express");
const router = express.Router();
const UserDetails = require("../models/user");
const sendMessage = require("../utils/sendMessage");

router.post("/sendOtp", async (req, res) => {
    if(!req.body.aadharNo){
        return res.status(400).send({
            "message": "Please enter the required fields"
        })
    }
    try{
        const aadharNo = req.body.aadharNo;
        var user_details = await UserDetails.findOne({aadhaar_number: aadharNo})

        if(!user_details){
            return res.status(400).send({
                "message": "User not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        await sendMessage("+91"+user_details.phoneNo, otp)

        user_details.otp = otp;
        user_details.otpValidTill = Date.now() + 15 * 60* 1000; // 15 minutes
        await user_details.save()
        return res.status(200).send({
            "message": "OTP sent successfully"
        })
    } catch (error) {
        return res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

router.post("/verifyOtp", async (req, res) => {
    if(!req.body.aadharNo || !req.body.otp){
        return res.status(400).send({
            "message": "Please enter the required fields"
        })
    }
    try{
        const aadharNo = req.body.aadharNo;
        const otp = req.body.otp;

        var user_details = await UserDetails.findOne({aadhaadhaar_numberarNo: aadharNo})

        if(!user_details){
            return res.status(400).send({
                "message": "User not found"
            })
        }

        if(!user_details.otp || !user_details.otpValidTill){
            return res.status(400).send({
                "message": "OTP not sent"
            })
        }

        if(user_details.otp != otp){
            return res.status(400).send({
                "message": "OTP does not match"
            })
        }

        if(user_details.otpValidTill < Date.now()){
            return res.status(400).send({
                "message": "OTP expired"
            })
        }
        
        user_details.otp = null;
        user_details.otpValidTill = null;
        await user_details.save()

        return res.status(200).send({
            "message": "OTP verified successfully"
        })

    } catch (error) {
        return res.status(400).send({
            "message": "Error "+ error.message
        })
    }
})

module.exports = router;