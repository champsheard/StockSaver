// Watchlist controller
const {getWatchlistByApiKey, addToWatchlistByApiKey, removeFromWatchlistByApiKey } = require('../utils/auth');
const { validateTickers, getWatchlistDataByApiKey } = require('../utils/stocks');

exports.getWatchlist = (req, res) => {
  try {
    const AuthHeader = req.headers['authorization'];
    const token = AuthHeader && AuthHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(`Get watchlist for API key: ${token}`);
    return res.status(200).json({ watchlist: getWatchlistByApiKey(token) });
  } catch (err) { 
    res.status(500).json({ error: `Failed to read configuration with error, ${err.message}` });
    }
};

exports.getAnalytics = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = await getWatchlistDataByApiKey(token);


    const valid = data.filter(d => !d.error && d.price != null);

    if (valid.length === 0) {
      return res.status(200).json({ analytics: {} });
    }

    const avgPrice =
      valid.reduce((sum, d) => sum + (d.price || 0), 0) / valid.length;

    const avgPercent =
      valid.reduce((sum, d) => sum + (d.percentChange || 0), 0) / valid.length;

    const gainers = valid.filter(d => (d.percentChange || 0) > 0).length;
    const losers = valid.filter(d => (d.percentChange || 0) < 0).length;

    const topGainer = valid.reduce((a, b) =>
      (b.percentChange || 0) > (a.percentChange || 0) ? b : a
    );

    const topLoser = valid.reduce((a, b) =>
      (b.percentChange || 0) < (a.percentChange || 0) ? b : a
    );

    const totalValue = valid.reduce(
      (sum, d) => sum + (d.value || (d.price * (d.shares || 0)) || 0),
      0
    );

    return res.status(200).json({
      analytics: {
        averagePrice: avgPrice,
        averagePercentChange: avgPercent,
        gainers,
        losers,
        total: valid.length,
        totalValue,
        topGainer,
        topLoser
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: `Failed to generate analytics: ${err.message}`
    });
  }
};

exports.getWatchlistData = async (req, res) => {
  try {
    const AuthHeader = req.headers['authorization'];
    const token = AuthHeader && AuthHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const watchlist = await getWatchlistDataByApiKey(token);
    console.log(`Get watchlist data for API key: ${token}`);
    return res.status(200).json({ data: watchlist });
  } catch (err) {
    res.status(500).json({ error: `Failed to read configuration with error, ${err.message}` });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { items, tickers } = req.body;

    let inputItems = items || tickers;

    if (!Array.isArray(inputItems) || inputItems.length === 0) {
      return res.status(400).json({ error: "Items or tickers must be a non-empty array" });
    }

    // Normalize items to {ticker, shares}
    const normalizedItems = items.map(item => {
      if (typeof item === 'string') {
        return { ticker: item.toUpperCase().trim(), shares: 1 };
      } else {
        return { ticker: item.ticker.toUpperCase().trim(), shares: item.shares || 1 };
      }
    }).filter(item => item.ticker);

    if (normalizedItems.length === 0) {
      return res.status(400).json({ error: "No valid items provided" });
    }

    // Extract tickers for validation
    const tickersForValidation = normalizedItems.map(item => item.ticker);

    const { valid, invalid } = await validateTickers(tickersForValidation);

    if (valid.length === 0) {
      return res.status(400).json({
        error: "No valid tickers provided",
        invalid
      });
    }

    // Filter normalizedItems to only valid tickers
    const validItems = normalizedItems.filter(item => valid.includes(item.ticker));

    const updatedWatchlist = addToWatchlistByApiKey(token, validItems);

    return res.status(200).json({
      watchlist: updatedWatchlist,
      added: validItems,
      invalid
    });

  } catch (err) {
    return res.status(500).json({
      error: `Failed to update watchlist: ${err.message}`
    });
  }
};


exports.removeFromWatchlist = (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { tickers } = req.body;

    if (!Array.isArray(tickers) || tickers.length === 0) {
      return res.status(400).json({ error: "Tickers must be a non-empty array" });
    }

    console.log(`Removing tickers for API key: ${token}`, tickers);

    const updatedWatchlist = removeFromWatchlistByApiKey(token, tickers);

    return res.status(200).json({ watchlist: updatedWatchlist });

  } catch (err) {
    return res.status(500).json({
      error: `Failed to update watchlist: ${err.message}`
    });
  }
};