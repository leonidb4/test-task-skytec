const payment = require('./modules/payment/payment.controller')

module.exports = (app) => {
    app.use('/payment', payment)

    app.use(
        /**
         * @param {Error} err 
         * @param {import('express').Request} req 
         * @param {import('express').Response} res 
         * @param {import('express').NextFunction} next
         */
        (err, req, res, next) => {
            switch (err.message) {
                case 'NOT_FOUND': {
                    return res.status(404).end()
                }
                case 'BAD_REQUEST': {
                    return res.status(400).end()
                }
                default: {
                    console.error(err.stack)

                    return res.status(500).end()
                }
            }
        })
}
