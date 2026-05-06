// Watchlist controller
const {getWatchlistByApiKey, addToWatchlistByApiKey, removeFromWatchlistByApiKey } = require('../utils/auth');

exports.getWatchlist = (req, res) => {
  try {
    const AuthHeader = req.headers['authorization'];
    const token = AuthHeader && AuthHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log(token)
    return res.status(200).json({ watchlist: getWatchlistByApiKey(token) });
  } catch (err) { 
    res.status(500).json({ error: `Failed to read configuration with error, ${err.message}` });
    }
};

exports.getAnalytics = (req, res) => {
  try {
    res.status(200).json({ analytics: { averagePrice: 100 } });
    console.log("Analytics retrieved successfully");
  } catch (err) {
    res.status(500).json({ error: "Failed to read configuration" });
  }
};

exports.addToWatchlist = (req, res) => {
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

    console.log(`Adding tickers for API key: ${token}`, tickers);

    const updatedWatchlist = addToWatchlistByApiKey(token, tickers);

    return res.status(200).json({ watchlist: updatedWatchlist });

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