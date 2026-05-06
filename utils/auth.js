const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../users.json');

const readDB = () => {
    const rawData = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(rawData);
};

const writeDB = (db) => {
    fs.writeFileSync(filepath, JSON.stringify(db, null, 4), "utf-8");
};

const createUser = (username) => {
    const db = readDB();
    
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

    writeDB(db);
    return user;
};

const getUserByApiKey = (apiKey) => {
    const db = readDB();
    return db.users[apiKey];
};

const getWatchlistByApiKey = (apiKey) => {
    const db = readDB();
    return db.users[apiKey]?.watchlist || [];
};

const addToWatchlistByApiKey = (apiKey, tickers) => {
    const db = readDB();

    const user = db.users[apiKey];
    if (!user) {
        throw new Error("User not found");
    }

    const normalized = tickers
        .map(t => t.toUpperCase().trim())
        .filter(Boolean);

    const set = new Set(user.watchlist);

    for (const ticker of normalized) {
        set.add(ticker);
    }

    user.watchlist = Array.from(set);

    writeDB(db);

    return user.watchlist;
};

const removeFromWatchlistByApiKey = (apiKey, tickers) => {
    const db = readDB();

    const user = db.users[apiKey];
    if (!user) {
        throw new Error("User not found");
    }

    const normalized = tickers
        .map(t => t.toUpperCase().trim())
        .filter(Boolean);

    user.watchlist = user.watchlist.filter(
        t => !normalized.includes(t)
    );

    writeDB(db);

    return user.watchlist;
};

module.exports = {
    createUser,
    getUserByApiKey,
    getWatchlistByApiKey,
    addToWatchlistByApiKey,
    removeFromWatchlistByApiKey
};