const {  mongoose } = require("mongoose");

let productschema=mongoose.Schema({
   productname:String,
   productimage:String,
   productprice:String,
   productdes:String,
   productquantity:String,

})

let products=new mongoose.model("Products",productschema)
module.exports=products