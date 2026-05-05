const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));



const dotenv = require('dotenv').config();

const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

const watchlistRouter = require('./routes/watchlistRoutes');
app.use('/watchlist', watchlistRouter);


app.get('/docs', (req, res) => {
    res.send('docs');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});