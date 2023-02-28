const winston = require('winston');
const errorFunction = require('../../utils/errorFunction')


module.exports = (app) => {

    app.use(async (req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        winston.error(`${req.method} ${req.url} ${error}`)
        next(error);
    });

    app.use( async (error, req, res, next) => {
        res.status(error.status || 500);

        winston.error(`${req.method} ${req.url} ${error}`)

        res.json(
            {
                message: 'There are errors..Something went wrong!!',
                error: {
                    status: error.status,
                    message: `${req.url} ${error.message}`,

                }
            }
        )
    });

}