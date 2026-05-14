const validateScore = (req,res,next) => {
    const {playerName, score, level, timeTaken} = req.body;
    if(
        typeof playerName !== "string"||
        playerName.trim().length === 0 ||
        playerName.length > 20
    ){
        return res.status(400).json({
        success: false,
        message: "Invalid playerName"});
    }
    if(
        typeof score !== "number"||
        score < 0
    ){
        return res.status(400).json({
            success: false,
            message: "Invalid score"});
    }
    if (
        !Number.isInteger(level) ||
        level < 1
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid level"});
    }
    if (
        typeof timeTaken !== "number" ||
        timeTaken < 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid timeTaken"});
    }

    next();
}

module.exports = validateScore;
