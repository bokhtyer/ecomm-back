const express = require("express")
const env = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")
const bodyParser = require('body-parser');
const cors = require("cors")
const morgan = require("morgan")
const userRouter = require("./routes/user")
// const tourRouter = require("./rotues/toru")
const categoryRouter = require("./routes/category")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")




const app = express();






//environment variable
env.config();

app.use(morgan("dev"));
app.use('/public', express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connect
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qgdbrib.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
//    ` mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.beczvzw.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    console.log("Database Conntect")
).catch((error)=>{
    console.log(`${error} DB Coonect Issue`)
})


app.use("/api",userRouter);
// app.use("/api/tour",tourRouter);
app.use("/api",categoryRouter);
app.use("/api",productRouter);
app.use("/api",cartRouter);

app.listen(process.env.PORT,()=>{
    console.log(`This Server is Running Your Server Port ${process.env.PORT}`)
});

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Hello World !"
    })
});