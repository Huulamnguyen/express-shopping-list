const express = require('express');
const app = express();
const itemsRoutes = require('./routes/items');
const ExpressError = require('./expressError');

/* Read and return JSON format */
app.use(express.json());

/* Express Routers */
app.use("/items", itemsRoutes);

/* 404 Handler */
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});
/* General error handler */
app.use( function (req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    });
});

module.exports = app;