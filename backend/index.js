const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 8000

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
const mongoURL = "mongodb://127.0.0.1:27017/GoFood?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2";
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

app.use(express.json())
app.use('/api',require("./Routes/createUsers"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.listen(port, () => {
    console.log("Server is running on 8000");
})