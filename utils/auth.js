const crypto = require('crypto');
const users = require('../users');

const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../users.json');

const createUser = (username) => {
    const  rawData = fs.readFileSync(filepath, "utf-8");
    const db = JSON.parse(rawData);
    
    if (!db.users) {
        db.users = {};
    }

    const apiKey = crypto.randomBytes(32).toString('hex');
    const user = {
         username, 
            apiKey,
         watchlist: []
        };
    
    db.users[apiKey] = user;

    fs.writeFileSync(filepath, JSON.stringify(db, null, 4), "utf-8");
    return user;
}

const getUserByApiKey = (apiKey) => {
    const  rawData = fs.readFileSync(filepath, "utf-8");
    const db = JSON.parse(rawData);
    return db.users[apiKey];
}

module.exports = {
    createUser,
    getUserByApiKey
}