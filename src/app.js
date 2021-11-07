const express = require("express");
const { join } = require('path');
const indexRouter = require('./routes/indexRoute');
const searchRouter = require('./routes/searchRoute');
const mapRoute = require('./routes/mapRoute');
const path = require("path");

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listen to http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const publicPath = join(__dirname, "../public");
app.use(express.static(publicPath));

app.use('/' , indexRouter);
app.use('/search', searchRouter);
app.use('/map', mapRoute);