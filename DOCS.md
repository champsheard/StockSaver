# StockSaver API Documentation

## Overview
StockSaver is a simple API for maintaining a stock watchlist and fetching stock data using Yahoo Finance.

## API Usage
The API is hosted online and can be accessed at: `https://stocksaver.euwainsheard.com`

### Authentication

#### POST /auth/register
Register a new user and obtain an API key for authentication.

**Request Body:**
```json
{
  "username": "yourname"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "apiKey": "..."
}
```

**Curl Example:**
```bash
curl -X POST https://stocksaver.euwainsheard.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "yourname"}'
```

***An API key can also be obtained by using the GUI***


#### GET /auth/me/:apiKey
Retrieve a user's profile by API key.

**Example:** GET /auth/me/<apiKey>

**Response:**
```json
{
  "username": "yourname",
  "apiKey": "your_api_key"
}
```

**Curl Example:**
```bash
curl https://stocksaver.euwainsheard.com/auth/me/YOUR_API_KEY
```

### Watchlist
These endpoints require an Authorization header: `Authorization: Bearer <apiKey>`

#### GET /watchlist/
Returns the current watchlist for the authenticated user.

**Response:**
```json
{
  "watchlist": [
    { "ticker": "AAPL", "shares": 1 }
  ]
}
```

**Curl Example:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stocksaver.euwainsheard.com/watchlist/
```

#### GET /watchlist/analytics
Returns aggregated analytics for the authenticated user's watchlist, including average price, percent change, gainers, losers, total value, and top performers.

**Response:**
```json
{
  "averagePrice": 150.0,
  "averagePercentChange": 2.5,
  "gainers": [...],
  "losers": [...],
  "total": 1000,
  "totalValue": 1000,
  "topGainer": {...},
  "topLoser": {...}
}
```

**Curl Example:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stocksaver.euwainsheard.com/watchlist/analytics
```

#### GET /watchlist/data
Returns current stock quote data for the watchlist.

**Response:**
```json
{
  "data": [
    {
      "ticker": "AAPL",
      "shares": 1,
      "price": 175.0,
      "value": 175.0,
      "change": 1.2,
      "percentChange": 0.7,
      "currency": "USD"
    }
  ]
}
```

**Curl Example:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://stocksaver.euwainsheard.com/watchlist/data
```

#### POST /watchlist/add
Add items to the authenticated user's watchlist.

**Request Body Examples:**
```json
{
  "items": [
    "AAPL",
    { "ticker": "MSFT", "shares": 2 }
  ]
}
```
or
```json
{
  "tickers": ["AAPL", "MSFT"]
}
```

**Response:**
```json
{
  "watchlist": [
    { "ticker": "AAPL", "shares": 1 },
    { "ticker": "MSFT", "shares": 2 }
  ],
  "added": [
    { "ticker": "AAPL", "shares": 1 },
    { "ticker": "MSFT", "shares": 2 }
  ],
  "invalid": []
}
```
Note: The server validates tickers via Yahoo Finance and returns any invalid ones.

**Curl Example:**
```bash
curl -X POST https://stocksaver.euwainsheard.com/watchlist/add \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL", "MSFT"]}'
```

#### DELETE /watchlist/remove
Remove one or more tickers from the authenticated user's watchlist.

**Request Body:**
```json
{
  "tickers": ["AAPL", "MSFT"]
}
```

**Response:**
```json
{
  "watchlist": []
}
```

**Curl Example:**
```bash
curl -X DELETE https://stocksaver.euwainsheard.com/watchlist/remove \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tickers": ["AAPL", "MSFT"]}'
```

### Stock Data
#### GET /stocks/:ticker
Fetch current quote data and the last 10 historical records for a ticker.

**Example:** GET /stocks/AAPL

**Response:**
```json
{
  "ticker": "AAPL",
  "price": 175.0,
  "change": 1.2,
  "percentChange": 0.7,
  "currency": "USD",
  "historyCount": 10,
  "history": [ ... last 10 points ... ]
}
```

**Curl Example:**
```bash
curl https://stocksaver.euwainsheard.com/stocks/AAPL
```

#### GET /stocks/:ticker/history
Fetch full historical price data for the ticker.

**Example:** GET /stocks/AAPL/history

**Response:**
```json
{
  "ticker": "AAPL",
  "count": 100,
  "history": [ ... ]
}
```

**Curl Example:**
```bash
curl https://stocksaver.euwainsheard.com/stocks/AAPL/history
```

## Notes
- User data is persisted securely on the server.
- Rate limiting may apply to certain endpoints (e.g., registration).
- All stock data is sourced from Yahoo Finance.