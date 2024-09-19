const express = require('express')
const paymentController = express.Router()

const { BigNumber } = require('bignumber.js')

const { paymentService } = require('./payment.service')

paymentController.post('/:id', (req, res) => {
    const userIdBigNumber = new BigNumber(req.params?.id, 10)
    if (userIdBigNumber.isNaN() || !userIdBigNumber.isInteger() || !userIdBigNumber.isPositive()) {
        console.debug('Incorrect id of user!')
        return res.status(400).end()
    }
    const userId = userIdBigNumber.toNumber()

    const action = req.body?.action
    if (!['PAY', 'CHARGE'].includes(action)) {
        console.debug('Incorrect action!')
        return res.status(400).end()
    }

    /** 
     * Используем отдельный тип чтобы число передавалось строкой 
     * и таким образом не потерять значащие цифры
     */
    const valueBigNumber = new BigNumber(req.body?.value, 10)
    if (valueBigNumber.isNaN() || !valueBigNumber.isPositive() || valueBigNumber.isEqualTo(0)) {
        console.debug('Incorrect value!')
        return res.status(400).end()
    }
    const value = valueBigNumber.toString()
    // примечание: нет ограничения на минимальную сумму

    paymentService.addOperation(userId, action, value)

    return res.status(201).end()
})

module.exports = paymentController
