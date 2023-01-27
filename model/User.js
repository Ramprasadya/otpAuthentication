const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "iamR@amprasad@#"

const userSchema = mongoose.Schema({
    number:{
        type : String,
        require : true
    }
},{timestamps: true})

userSchema.methods.generateJWT=()=>{
    const token = jwt.sign({
        _id : this.id,
        number : this.number
    },JWT_SECRET_KEY,{expiresIn:"5d"})

    return token
}

const userModel = mongoose.model("userModel" , userSchema)

module.exports = userModel