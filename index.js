const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('public'));




const dotenv = require('dotenv').config();

const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

const watchlistRouter = require('./routes/watchlistRoutes');
app.use('/watchlist', watchlistRouter);

const stockRouter = require('./routes/stockRoutes');
app.use('/stocks', stockRouter);

app.get('/docs', (req, res) => {
    res.send('docs');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});