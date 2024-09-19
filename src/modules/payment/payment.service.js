const { default: BigNumber } = require('bignumber.js')
const { EventEmitter } = require('node:events')

const { tables: { payments } } = require('../../db')
const { userService } = require('../user/user.service')

const paymentService = {
    eventBus: new EventEmitter(),

    /**
     * @param {number} userId
     * @param {'PAY' | 'CHARGE'} action
     * @param {string} value уже положительное и не 0
     */
    addOperation: (userId, action, value) => {
        const user = userService.getOneById(userId)

        const userBalanceBigNumber = new BigNumber(user.balance)
        if (action === 'PAY' && userBalanceBigNumber.isLessThan(value)) {
            console.debug('Not enought balance!')
            throw new Error('BAD_REQUEST')
        }

        /** @type {(typeof payments)[number]} */
        const data = {
            user_id: userId,
            action,
            amount: value,
            ts: Date.now()
        }
        payments.push(data)

        console.debug('paymentService.addOperation', data)

        paymentService.eventBus.emit('CREATED', data) // пересчет баланса по истории после каждой операции в поле balance таблицы users
    },

    /**
     * @param {number} userId
     * @returns {string}
     */
    getBalanceByUserId: (userId) => {
        let userBalanceBigNumber = new BigNumber(0)
        payments
            .filter(payment => payment.user_id === userId)
            .map((data) => {
                if (data.action === 'CHARGE') {
                    userBalanceBigNumber = userBalanceBigNumber.plus(data.amount)
                } else if (data.action === 'PAY') {
                    userBalanceBigNumber = userBalanceBigNumber.minus(data.amount)
                }
            })
        const userBalance = userBalanceBigNumber.toString()

        console.debug('paymentService.getBalanceByUserId', { user_id: userId, balance: userBalance })

        return userBalance
    }
}

module.exports.paymentService = paymentService
