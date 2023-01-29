const express = require("express");
const router = express.Router();
const bcypt = require("bcrypt");
const _ = require("lodash");
const axios = require("axios");
const otpgenerator = require("otp-generator");

const User = require("../model/User");
const Otp = require("../model/Opt");

// With the Help of this we Generate the otp , End point  POST Method  :  http://localhost:3000/api/user
router.post("/user", async (req, res) => {
  const user = await User.findOne({
    number: await req.body.number,
  });

  if (!user) {
    const OTP = otpgenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const number = req.body.number;
    console.log(OTP);

    const otp = new Otp({ number: number, otp: OTP });
    const salt = await bcypt.genSalt(10);
    otp.otp = await bcypt.hash(otp.otp, salt);
    otp.save();

    return res.status(200).send("otp send Successfully");
  } else if (user) {
    return res.status(400).send("User already exists");
  }
  
});

module.exports = router;
