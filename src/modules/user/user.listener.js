const { tables } = require('../../db')
const { paymentService } = require('../payment/payment.service')
const { userService } = require('./user.service')

const userListener = {
    /** @param {(typeof tables.payments)[number]} data */
    onPayment: (data) => {
        const balance = paymentService.getBalanceByUserId(data.user_id)
        userService.updateBalance(data.user_id, balance)
    },
}

paymentService.eventBus.on('CREATED', userListener.onPayment)
