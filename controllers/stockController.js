

exports.getStock = (req, res) => {
    const ticker = req.params.ticker;
    res.json({ message: `Stock data for ${ticker}` });
};

exports.getStockHistory = (req, res) => {
    const ticker = req.params.ticker;
    res.json({ message: `Historical stock data for ${ticker}` });
};