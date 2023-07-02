const express = require('express');
const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
// require('dotenv').config({path: __dirname + '/.env'});
const port = process.env.PORT || 8000;

app.use(cors());

// app.use(
//     cors({
//       origin: 'https://awsome-food-frontend.vercel.app', // Replace with your frontend URL
//       methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow the necessary HTTP methods
//       allowedHeaders: ['Content-Type', 'Authorization'], // Allow the necessary headers
//     })
//   );
  const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
const mongoURL = "mongodb+srv://admin-arpit:Asdf1234@cluster0.gn6ojf5.mongodb.net/GoFood?retryWrites=true&w=majority";
const mongoDB = async()=>{
    await mongoose.connect(mongoURL, { useNewURLParser: true }).then(
        async (err, result) => {
            try {
              console.log("connected");
              const fetched_data = await mongoose.connection.db.collection("foodItems");
              fetched_data.find({}).toArray().then(
                async (data,err)=>{
                    const foodCategory = await mongoose.connection.db.collection("foodCategory");
                    foodCategory.find({}).toArray().then(
                        async (catData,err)=>{
                            try {
                                if (err) {
                                  console.error('Error while fetching data:', err);
                                  return;
                                }
                                global.food_items = data;
                                global.foodCategory = catData;
                                
                                // console.log(food_items);
                              } catch (err) {
                                console.log(err);
                              }
                        }
                    )

                    
                }
              );
              
              
            } catch (err) {
              console.log(err);
            }
          });      
}

mongoDB();

app.get('/',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
});


app.use(express.json());
app.use('/api',require("./Routes/createUsers"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));


app.listen(port,()=>{console.log('this app is running on '+port)})