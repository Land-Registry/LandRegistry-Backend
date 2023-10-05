const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const app = express()

// Regular middleware
app.use(express.json());
app.use(cors());

// routers
const landDetailsRouter = require('./routes/landDetails')
app.use('/landDetails', landDetailsRouter)

const SellingLandRouter = require('./routes/SellingLand')
app.use('/SellingLand', SellingLandRouter)

const userDetailsRouter = require('./routes/user')
app.use('/user', userDetailsRouter)

const verifyOtpRouter = require('./routes/verifyOtp')
app.use('/otp', verifyOtpRouter)

const purchaseRequestRouter = require('./routes/purchaseRequest')
app.use('/purchaseRequest', purchaseRequestRouter)

const auctionRouter = require('./routes/auction')
app.use('/auction', auctionRouter)

const getall = require('./routes/getall')
app.use('/getall', getall)

// PORT
const port = process.env.PORT || 8000;

// MONGODB Connect
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log(`DB connected successfully`))
.catch(error =>{
    console.log(`DB connection failed`);
    console.log(error);
    process.exit(1);
})

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});