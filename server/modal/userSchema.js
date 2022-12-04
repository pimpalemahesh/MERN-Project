const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    profession:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    cpassword:{
        type:String,
        required: true
    },
    
})

const User = mongoose.model('Authentication', userSchema);
module.exports = User;