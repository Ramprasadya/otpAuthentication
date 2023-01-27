const mongoose = require('mongoose')

const optSchema = mongoose.Schema({
    number : {
        type : String,
        require :true
    },
    otp:{
        type : String,
        require :true
    },
    createdAt:{
        type : Date,
        default : Date.now,
        index :{
            expires : 300
        }
    }
},{timestamps: true})

const otpModel = mongoose.model("otpModel" , optSchema)

module.exports = otpModel;