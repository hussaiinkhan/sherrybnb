const mongoose= require('mongoose')

const placeSchema = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    title:{
        type: String,
        required: [true,"Please add a title"]
    },
    address:{
        type: String,
        required: [true,'Please provide a valid  address'],
    },
    photos:{
        type: [String]
    },
    description:{
        type : String,
        required : [true,'Please provide a description']
    },
    perks:{
        type : [String]
    },
    extraInfo:{
        type : String
    },
    checkIn :{
        type : Number
    },
    checkOut : {
        type: Number
    },
    maxGuests : {
        type: Number
    }
},{timestamps:true})

module.exports = mongoose.model('Place',placeSchema)