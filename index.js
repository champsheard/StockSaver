const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.use(express.static("public"));




const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

const watchlistRouter = require('./routes/watchlistRoutes');
app.use('/watchlist', watchlistRouter);

const stockRouter = require('./routes/stockRoutes');
app.use('/stocks', stockRouter);

app.get("/docs", (req, res) => {
  const filePath = path.join(__dirname, "DOCS.md");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error loading docs");
    }

    const html = md.render(data);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>StockSaver Docs</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 0 20px;
              line-height: 1.6;
            }
            pre {
              background: #f4f4f4;
              padding: 10px;
              overflow-x: auto;
            }
            code {
              background: #eee;
              padding: 2px 4px;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);
  });
});



const PORT = process.env.PORT || 3000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;