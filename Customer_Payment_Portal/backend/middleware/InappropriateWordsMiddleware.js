// Array of inappropriate words that are not allowed in usernames
const inappropriateWords = [
    "jail",  
    "thugs", 
    "drugs", 
    "bad",   
    "death"  
];

const inappropriateWordsMiddleware = (req, res, next) => {
    const { username } = req.body;

    // Convert the username to lowercase for case-insensitive comparison
    const lowerUsername = username.toLowerCase();

    const containsInappropriateWord = inappropriateWords.some(word => lowerUsername.includes(word));

    if (containsInappropriateWord) {
        return res.status(400).json({ message: "Username contains inappropriate word" });
    }

    // If no inappropriate words are found, proceed to the next middleware or route handler
    next();
};

export default inappropriateWordsMiddleware;
