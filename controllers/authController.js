const {createUser, getUserByApiKey} = require('../utils/auth');


exports.register = (req, res) => {
    try {
        const { username } = req.body;
        console.log(`Attempting to register user: ${username}`);

        if(!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = createUser(username);
        console.log(`User created with API key: ${user.apiKey}`);
        res.status(201).json({ 
            message: "User registered successfully",
            apiKey: user.apiKey 
        });
        console.log(`User registered ${username}`);
    } catch (err) {
        res.status(500).json({ error: `Failed to register user ${err.message}` });
    }
};


exports.getProfile = (req, res) => {
    try {
        const id = req.params.id;
        const user = getUserByApiKey(id);
        res.status(200).json({ 
            username: user.username,
            watchlist: user.watchlist
        });
        console.log(`Profile retrieved for API key: ${id}`);
    } catch (err) {
        res.status(500).json({ error: `Failed to retrieve user profile ${err.message}` });
    }
}; 