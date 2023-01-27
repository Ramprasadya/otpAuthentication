const express = require("express");
const router = express.Router();
const bcypt = require("bcrypt");
const _ = require("lodash");

const User = require("../model/User");
const Otp = require("../model/Opt");

// With the Help of this we Verify  the otp and save the data , End point  POST Method  :  http://localhost:3000/api/verify

router.post("/verify", async (req, res) => {
  const otpHolder = await Otp.find({
    number: req.body.number,
  });
  if (otpHolder === 0) {
    return res.send(400).send("This Otp is Expired !");
  }

  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const validUser = await bcypt.compare(req.body.otp, rightOtpFind.otp);
  if (rightOtpFind.number === req.body.number && validUser) {
    const user = new User(_.pick(req.body, ["number"]));
    const token = user.generateJWT();
    const result = await user.save();
    const otpDelete = await Otp.deleteMany({
      number: rightOtpFind.number,
    });

    return res.status(200).send({
      massage: "User Registration Successfull",
      token: token,
      data: result,
    });
  } else {
    return res.status(400).send("Wrong otp entered");
  }
});

module.exports = router;
