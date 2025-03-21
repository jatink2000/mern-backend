const {  mongoose } = require("mongoose");

let adminschema=mongoose.Schema({
  email:String,
  password:String
})

let admin=new mongoose.model("admin",adminschema)
module.exports=admin