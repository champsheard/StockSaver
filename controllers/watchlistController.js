// Watchlist controller

exports.getWatchlist = (req, res) => {
  try {
   res.status(200).json({ watchlist: [] });
   console.log("Watchlist retrieved successfully");
  } catch (err) {
    res.status(500).json({ error: "Failed to read fan configuration" });
  }
};



exports.getAnalytics = (req, res) => {
  try {
    res.status(200).json({ analytics: { averagePrice: 100 } });
    console.log("Analytics retrieved successfully");
  } catch (err) {
    res.status(500).json({ error: "Failed to read fan configuration" });
  }
};

exports.addToWatchlist = (req, res) => {
  const { ticker } = req.body;
  try {
    res.status(200).json({ message: `${ticker} added to watchlist` });
    console.log(`${ticker} added to watchlist successfully`);
  } catch (err) {
    res.status(500).json({ error: "Failed to read fan configuration" });
  }
};

exports.removeFromWatchlist = (req, res) => {
  const { ticker } = req.body;
  try {
    res.status(200).json({ message: `${ticker} removed from watchlist` });
    console.log(`${ticker} removed from watchlist successfully`);
  } catch (err) {
    res.status(500).json({ error: "Failed to read fan configuration" });
  } 
};
