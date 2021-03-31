/*
ExpressError extends the normal JS error so we can easily add a status when we make an instance of it.

The Error Handler Miidleware will return this.
*/

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        console.log(this.stack);
    }
}

module.exports = ExpressError;