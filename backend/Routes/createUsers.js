const express = require('express');
const router = express.Router()
const User = require("../models/User");
// const { model } = require('mongoose');
const { body, validationResult } = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const jwtSecret =  "asdfghjklzxcrt";

router.post("/createuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                password: secPassword,
                email: req.body.email,
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })


    router.post("/loginUser", [
        body('email').isEmail(),
        body('password').isLength({ min: 5 }),
        ],
        async (req, res) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
            try {
                let userData = await User.findOne({email});
                console.log(userData);  
                if(!userData){
                    return res.status(400).json({errors:"Please check credentials"})
                }

                const pwdCompare = await bcryptjs.compare(req.body.password,userData.password)

                if(! pwdCompare){
                    return res.status(400).json({errors:"Please check credentials"})
                }

                const data = {
                    user:{
                        id:userData.id
                    }
                }
                const authToken = jsonwebtoken.sign(data,jwtSecret)
                
                return res.send({success:true,authToken:authToken})


            } catch (error) {
                console.log(error);
                res.json({ success: false })
            }
        })
       
module.exports = router;