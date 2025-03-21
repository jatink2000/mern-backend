const {  mongoose } = require("mongoose");

let cartschema=mongoose.Schema({
   productname:String,
   productimage:String,
   productprice:String,
   productdes:String,
   productquantity:String,
   productid:String
})

let cartproduct=new mongoose.model("Carts",cartschema)
module.exports=cartproduct