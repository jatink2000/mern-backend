const {  mongoose } = require("mongoose");

let userschema=mongoose.Schema({
    "username":String,
    "email":String,
    "password":String,

})

let users=new mongoose.model("users",userschema)
module.exports=users