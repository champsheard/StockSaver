const YahooFinance = require('yahoo-finance2').default;

const yahooFinance = new YahooFinance();


exports.getStock = async (req, res) => {
    console.log(`Fetching stock data for ticker: ${req.params.ticker}`);
    try {
        const ticker = req.params.ticker.toUpperCase();

        // Current quote
        const quote = await yahooFinance.quote(ticker);

        // Historical data (last 30 days example)
        const history = await yahooFinance.historical(ticker, {
            period1: '2024-01-01',
            period2: new Date().toISOString().split('T')[0],
        });

        res.json({
            ticker,
            price: quote.regularMarketPrice,
            change: quote.regularMarketChange,
            percentChange: quote.regularMarketChangePercent,
            currency: quote.currency,
            historyCount: history.length,
            history: history.slice(-10) // last 10 points (avoid huge response)
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: 'Failed to fetch stock data',
            details: err.message
        });
    }
};


exports.getStockHistory = async (req, res) => {
    try {
        const ticker = req.params.ticker.toUpperCase();

        // Get historical data (last ~1 year)
        const history = await yahooFinance.historical(ticker, {
            period1: '2024-01-01',
            period2: new Date().toISOString().split('T')[0],
        });

        res.json({
            ticker,
            count: history.length,
            history
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: 'Failed to fetch historical data',
            details: err.message
        });
    }
};
