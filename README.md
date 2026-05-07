# StockSaver

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A simple stock watchlist API with real-time quotes, analytics, and secure API key access.**

StockSaver makes it easy to track tickers and manage your watchlist with a clean REST interface.

## Features

- **User Authentication**: Secure API key-based authentication
- **Real-time Stock Data**: Fetch current quotes and historical data from Yahoo Finance
- **Watchlist Management**: Add, remove, and track stocks in your personal watchlist
- **Portfolio Analytics**: Get insights like total value, gainers/losers, and performance metrics
- **Deployed on Vercel**: Accessible worldwide with high availability
- **CORS Enabled**: Easy integration with web applications
- **Interactive Docs**: Built-in documentation

## 🚀 Quick Start

### Try It Out
Visit the live API: **[https://stocksaver.euwainsheard.com](https://stocksaver.euwainsheard.com)**

#### 1. Register a new user and get an API key
```bash
curl -X POST https://stocksaver.euwainsheard.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "yourname"}'
```

#### 2. Fetch stock data
```bash
curl https://stocksaver.euwainsheard.com/stocks/AAPL
```

#### 3. Add stocks to your watchlist (replace YOUR_API_KEY with your actual key)
```bash
curl -X POST https://stocksaver.euwainsheard.com/watchlist/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL", "MSFT"]}'
```

#### 4. Get your watchlist analytics
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stocksaver.euwainsheard.com/watchlist/analytics
```

For full documentation, visit: **[https://stocksaver.euwainsheard.com/docs](https://stocksaver.euwainsheard.com/docs)**

### Local Development
If you want to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stocksaver.git
   cd stocksaver
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   # Add any other required environment variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Or run in production**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or your configured PORT).

## Simple API Documentation

### Authentication
- **POST** `/auth/register` - Register a new user and get an API key
- **GET** `/auth/me/:apiKey` - Get user profile

### Watchlist Management
- **GET** `/watchlist/` - Get your watchlist
- **GET** `/watchlist/analytics` - Get portfolio analytics
- **GET** `/watchlist/data` - Get current stock data for watchlist
- **POST** `/watchlist/add` - Add stocks to watchlist
- **DELETE** `/watchlist/remove` - Remove stocks from watchlist

### Stock Data
- **GET** `/stocks/:ticker` - Get current quote and recent history
- **GET** `/stocks/:ticker/history` - Get full historical data

### Interactive Documentation
Visit `/docs` endpoint to view the full API documentation with examples.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Data Source**: Yahoo Finance API
- **Authentication**: API Key-based
- **Deployment**: Vercel
- **Documentation**: Markdown-it for HTML rendering
- **Rate Limiting**: express-rate-limit
- **CORS**: Enabled for cross-origin requests

## 📋 Dependencies

- `express` - Web framework
- `yahoo-finance2` - Stock data fetching
- `cors` - Cross-origin resource sharing
- `express-rate-limit` - API rate limiting
- `markdown-it` - Documentation rendering
- `dotenv` - Environment variable management


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

