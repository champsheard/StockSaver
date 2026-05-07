const YahooFinance = require('yahoo-finance2').default;

const yahooFinance = new YahooFinance();
const fs = require('fs');
const os = require('os');
const path = require('path');

const localFile = path.join(__dirname, '../users.json');
const runtimeFile = path.join(os.tmpdir(), 'stocksaver-users.json');

const getDbPath = () => {
    if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
        if (!fs.existsSync(runtimeFile)) {
            if (fs.existsSync(localFile)) {
                fs.copyFileSync(localFile, runtimeFile);
            } else {
                fs.writeFileSync(runtimeFile, JSON.stringify({ users: {} }, null, 4), 'utf-8');
            }
        }
        return runtimeFile;
    }

    return localFile;
};

const readDB = () => {
    const filepath = getDbPath();
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, JSON.stringify({ users: {} }, null, 4), 'utf-8');
    }
    const rawData = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(rawData || '{"users":{}}');
};

// const writeDB = (db) => {
//     fs.writeFileSync(filepath, JSON.stringify(db, null, 4), "utf-8");
// };



const validateTickers = async (tickers) => {
    const valid = [];
    const invalid = [];

    for (let ticker of tickers) {
        ticker = ticker.toUpperCase().trim();
        if (!ticker) continue;

        try {
            const quote = await yahooFinance.quote(ticker);

            if (quote && quote.regularMarketPrice !== null) {
                valid.push(ticker);
            } else {
                invalid.push(ticker);
            }

        } catch (err) {
            invalid.push(ticker);
        }
    }

    return { valid, invalid };
};


const getWatchlistDataByApiKey = async (apiKey) => {
    const db = readDB();
    const user = db.users[apiKey];

    if (!user) {
        throw new Error("User not found");
    }

    const watchlist = user.watchlist || [];

    const results = await Promise.allSettled(
        watchlist.map(item => yahooFinance.quote(item.ticker))
    );

    const data = results.map((result, index) => {
        const item = watchlist[index];
        const shares = item.shares ?? 0;

        if (result.status === "fulfilled") {
            const quote = result.value;
            const price = quote?.regularMarketPrice ?? 0;

            return {
                ticker: item.ticker,
                shares,
                price,
                value: price * shares, // 💰 key addition
                change: quote?.regularMarketChange ?? 0,
                percentChange: quote?.regularMarketChangePercent ?? 0,
                currency: quote?.currency ?? "USD"
            };
        } else {
            return {
                ticker: item.ticker,
                shares,
                error: "Failed to fetch data",
                value: 0
            };
        }
    });

    return data;
};

module.exports = { validateTickers, getWatchlistDataByApiKey };