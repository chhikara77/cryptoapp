const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        symbol:{
            type:String,
            required:true
        },
        current_price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        market_cap:{
            type:Number,
            required:true
        }
    }
)

module.exports = mongoose.model("Coins",postSchema)
