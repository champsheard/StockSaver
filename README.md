# StockSaver
**Developed by Euwain Sheard**

**A simple stock watchlist API with real-time quotes, analytics, and secure API key access.**

StockSaver makes it seamless to track tickers and manage your watchlist, and get general info on stocks.

## Features

- **Built on Express:** Secure, Speedy, Reliable
- **Real-time Stock Data**: Current and up to date stock data (provided by yahoo finance)
- **Watchlist Management**: Add, remove, and track stocks in your personal watchlist. <em>Bonus Analytics feature</em>


## Quick Start

### Try It Out
Visit the live API: **[https://stocksaver.euwainsheard.com](https://stocksaver.euwainsheard.com)**

### Accounts
#### 1. Register a new user and get an API key
```bash
curl -X POST https://stocksaver.euwainsheard.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "yourname"}'
```

#### 2. Add stocks to your watchlist (replace YOUR_API_KEY with your actual key)
```bash
curl -X POST https://stocksaver.euwainsheard.com/watchlist/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL", "MSFT"]}'
```

#### 3. Get your watchlist data
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stocksaver.euwainsheard.com/watchlist/
```

#### 4. Get your Analytics
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stocksaver.euwainsheard.com/watchlist/
```


#### 4. Remove stocks from your Watchlist 
```bash
curl -X DELETE https://stocksaver.euwainsheard.com/watchlist/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL", "MSFT"]}'
```


### Generic data

```bash
curl https://stocksaver.euwainsheard.com/stocks/AAPL
```

For full documentation, visit: **[https://stocksaver.euwainsheard.com/docs](https://stocksaver.euwainsheard.com/docs)**



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

