const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");

app.use(express.json());
app.use(cors());

// Kết nối MongoDB
mongoose.connect("mongodb+srv://vudev49:Vuhero49@cluster0.xkgawyr.mongodb.net/e-commerce");

// Tạo API
app.get("/",(req, res)  => {
    res.send("Hello World!");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// Upload ảnh
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Tạo bảng trong MongoDb
const Product = mongoose.model("product", {
    id:{
        type: Number,
        required:  true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    new_price:{
        type:Number,
        required: true,
    },
    old_price:{
        type:Number,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now(),
    },
    avilable:{
        type: Boolean,
        default: true,
    }
})

// Thêm sản phẩm
app.post('/addproduct', async (req, res)=>{
    // Id tự động tăng
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Xóa sản phẩm theo ID
app.post('/removeproduct', async (req, res) =>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Lấy hết sản phẩm
app.get('/allproducts', async  (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema creating for user model
const User = mongoose.model('Users', {
    name: {
        type:String
    },
    email:{
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }

})

//  Thêm người dùng mới vào CSDL
app.post('/signup', async (req, res) => {
    // Thêm câu lệnh kiểm tra
    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, error:"Email đã được sử dụng"});
    }

    // Tiếp tục đăng ký người dùng mới
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new  User({
        name : req.body.name ,
        email : req.body.email ,
        password : req.body.password ,
        cartData : cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data , 'secret_ecom');
    res.json({success:true, token})

})

//  Đăng nhập
app.post('/login', async(req, res)=>{
    let user = await User.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, error:"Sai mật khẩu"});
        }
    }
    else{
        res.json({success:false, error:"Sai email"});
    }
})

// Creating endpoint for newcollection Data
app.get('/newcollections', async (req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// Creating endpoint for popular in men section
app.get('/popularinmen', async (req, res) =>{
    let products = await Product.find({category:"men"});
    let popular_in_men = products.slice(0,4);
    console.log("Bán chạy ở Nam");
    res.send(popular_in_men);
})

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Vui lòng nhập mã hợp lệ 1" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Vui lòng nhập mã hợp lệ 2" });
        }
    }
}

// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser ,async (req, res) =>{
    console.log("Đã thêm", req.body.itemId);
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Đã thêm vào giỏ hàng");
})

//Creating endpoint to remove products in cartdata
app.post('/removefromcart', fetchUser, async(req, res) =>{
    console.log("Đã xóa", req.body.itemId);
    let userData = await User.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Đã xóa khỏi giỏ hàng");
})

// Creating to get cartData
app.post('/getcart', fetchUser, async(req, res)=>{
    console.log("Lấy giỏ hàng");
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Port
app.listen(port, (error)=>{
    if(!error)
    console.log(`Server is running on http://localhost:${port}`);
    else
    console.log(`Error ${error}`)
});