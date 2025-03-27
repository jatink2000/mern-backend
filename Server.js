const bodyParser = require("body-parser")


express = require("express")
cors = require("cors")

app = express()

app.use(cors())

app.listen(8080, () => {
    console.log("server start")
})


// mongoose schema -------------------
let users = require("./model/Users")
let products = require("./model/Products")
let cartproduct = require("./model/Carts")
let admin = require("./model/Admin")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({}))

// mongoose -----------------------
const { mongoose } = require("mongoose")

mongoose.connect("mongodb+srv://jk0060701:YNGaddqw8kbBqixG@cluster0.jrxe8v9.mongodb.net/mern3").then(() => {
    console.log("mongodb connect")
}).catch((err) => {
    console.log(err)
})



// signup -------------

app.post("/signup", async (req, res) => {
    let groot = users({
        "email": req.body.login.email,
        "password": req.body.login.password,
    })

    let result = await groot.save()

    if (result) {
        res.json({
            msg: "signup ...",
            status: true
        })
    }
    else {
        res.json({
            msg: "failed to signup ...",
            status: false
        })
    }
})



// allusers---------------------

app.get("/allusers", async (req, res) => {
    let alluser = await users.find({})
    if (alluser) {
        res.json({
            msg: "allusers",
            users: alluser,
            status: true
        })
    }
    else {
        res.json({
            msg: "failed to allusers",
            status: false
        })
    }
})



// login -----------------

app.post("/login", async (req, res) => {
    let groot = await users.findOne({
        "email": req.body.login.email,
        "password": req.body.login.password,
    })

    if (groot) {
        res.json({
            msg: "login",
            status: true
        })
    }
    else {
        res.json({
            msg: "failed to login",
            status: false
        })
    }
})



// addproduct ---------------------------
app.post("/addproduct", async (req, res) => {
    let product = products({
        productname: req.body.product.productname,
        productimage: req.body.product.productimage,
        productprice: req.body.product.productprice,
        productdes: req.body.product.productdes,
        productquantity: req.body.product.productquantity,
    })

    let result = await product.save()

    if (result) {
        res.json({
            msg: "add to product",
            status: true
        })
    }
    else {
        res.json({
            msg: "failed to addproduct ...",
            status: false
        })
    }
})




// ourproduct -----------
app.get("/ourproduct", async (req, res) => {
    let allproduct = await products.find({})


    if (allproduct) {
        res.json({
            status: true,
            product: allproduct
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})




// addtocart -----------
app.post("/addtocart", async (req, res) => {
    let cartdata = cartproduct({
        productname: req.body.item.productname,
        productimage: req.body.item.productimage,
        productprice: req.body.item.productprice,
        productdes: req.body.item.productdes,
        productquantity: req.body.item.productquantity,
        productid: req.body.item._id
    })
    let result = await cartdata.save()

    if (result) {
        res.json({
            msg: "add to cart",
            status: true
        })
    }
    else {
        res.json({
            msg: "failed to add cart",
            status: false
        })
    }
})



// cartproduct- ------------

app.get("/cartproduct", async (req, res) => {
    let cartdata = await cartproduct.find({})


    if (cartdata) {
        res.json({
            status: true,
            product: cartdata
        })
    }
    else {
        res.json({
            status: false,
        })
    }
})



// removecartproduct ---------

app.post("/removecartproduct", async (req, res) => {
    let removeproduct = await cartproduct.findOneAndDelete({ _id: req.body.item._id })

    if (removeproduct) {
        res.json({
            status: true,
            msg: "remove product"
        })
    }
    else {
        res.json({
            status: true,
            msg: "failed to remove product"
        })
    }
})


// updatecartproduct--------------------

app.post("/updatecartproduct", async (req, res) => {
    let updateitem = await cartproduct.updateOne({ _id: req.body.data._id }, { $set: { "productquantity": req.body.quantity } })

    if (updateitem) {
        res.json({
            msg: "updateitem",
            status: true
        })
    }
    else {
        res.json({
            msg: "failed to updateitem",
            status: false
        })
    }
})




// admin ------------------
app.post("/admin", async (req, res) => {
    let admindata = await admin.findOne({
        email: req.body.login.email,
        password: req.body.login.password,
    })
    if (admindata) {
        res.json({
            status: true,
            msg: "admin login"
        })
    }
    else {
        res.json({
            status: false,
            msg: "failed to admin login"
        })
    }
})


// deleteproduct ----------------
app.post("/deleteproduct", async (req, res) => {
    let deletedata = await products.deleteOne({ _id: req.body.item._id })

    if (deletedata) {
        res.json({
            status: true,
            "msg": "delete product"
        })
    }
    else {
        res.json({
            status: false,
            "msg": "failed to delete product"
        })
    }
})


app.post("/", async (req, res) => {
        res.json({
            status: true,
            "msg": "Active"
        })
})




// updateproduct------------

app.post("/updateproduct", async (req, res) => {
    let updateproduct = await products.findByIdAndUpdate({ _id: req.body.product._id }, { $set: { "productname": req.body.product.productname, "productprice": req.body.product.productprice } })

})