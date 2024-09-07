const mongoose= require('mongoose')

const bookingSchema = mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    place:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Booking',bookingSchema)