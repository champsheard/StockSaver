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

const addToWatchlistByApiKey = (apiKey, items) => {
    const db = readDB();

    const user = db.users[apiKey];
    if (!user) {
        throw new Error("User not found");
    }

    // Ensure items is array of {ticker, shares}
    const normalizedItems = items.map(item => {
        if (typeof item === 'string') {
            return { ticker: item.toUpperCase().trim(), shares: 1 };
        } else {
            return { ticker: item.ticker.toUpperCase().trim(), shares: item.shares || 1 };
        }
    }).filter(item => item.ticker);

    // Use a map to merge shares for same ticker
    const watchlistMap = new Map();
    user.watchlist.forEach(item => {
        watchlistMap.set(item.ticker, item.shares);
    });

    normalizedItems.forEach(item => {
        const existingShares = watchlistMap.get(item.ticker) || 0;
        watchlistMap.set(item.ticker, existingShares + item.shares);
    });

    user.watchlist = Array.from(watchlistMap.entries()).map(([ticker, shares]) => ({ ticker, shares }));

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
        item => !normalized.includes(item.ticker)
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