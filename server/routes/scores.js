const express = require("express");
const router = express.Router();
const Score = require("../models/Score");
const validateScore = require("../middleware/validate");

router.get("/",async (req,res) => {
    try{
        const topScores = await Score.find()
                            .sort({score:-1})
                            .limit(10)
                            .select("-__v");
        res.status(200).json({scores: topScores});
    }catch(err){
        res.status(500).json(err.message);
    }
})

router.post("/",validateScore,async (req,res) => {
    try{
        let {playerName, score, level, timeTaken} = req.body;
        const newDoc = await Score.create({playerName, score, level, timeTaken});
        res.status(201).json({
            success: true, 
            id: newDoc._id
        });
    }catch(err){
        res.status(400).json({success: false,message: err.message});
    }
})

module.exports = router;
