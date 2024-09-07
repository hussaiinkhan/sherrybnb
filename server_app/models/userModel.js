const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please add a name"]
    },
    email:{
        type: String,
        required: [true,'Please provide a valid email address'],
        unique:[true,'Email Address already taken']
    },
    password:{
        type: String,
        required: [true,"Please add a username"]
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)