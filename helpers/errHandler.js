const errHandler = (promise) =>
    promise.then((data) => [undefined, data]).catch((err) => [err]);

module.exports = errHandler;
