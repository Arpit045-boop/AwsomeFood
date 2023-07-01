const express = require('express');
const router = express.Router();

router.get('/foodData',(req,res)=>{
    try{
        res.send([food_items,foodCategory]);
    }catch{
        console.error(res);
        res.send("Server error")
    }

});


module.exports = router;