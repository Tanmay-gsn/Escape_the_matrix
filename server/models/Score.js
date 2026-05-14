const mongoose = require("mongoose");
const scoreSchema = new mongoose.Schema({
    playerName:{
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    score:{
        type: Number,
        required: true,
        min: 0
    },
    level:{
        type: Number,
        required: true,
        min: 1
    },
    timeTaken:{
        type: Number,
        required: true,
        min: 0
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Score",scoreSchema);
