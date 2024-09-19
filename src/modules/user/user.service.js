const { tables: { users } } = require('../../db')

const userService = {
    /**
     * @param {number} userId
     * @return {(typeof users)[number]}
     */
    getOneById: (userId) => {
        const user = users.find(user => user.id === userId)

        if (!user) {
            console.debug('User not found!')
            throw new Error('NOT_FOUND')
        }

        return user
    },

    /**
     * @param {number} userId 
     * @param {string} newBalance 
     */
    updateBalance: (userId, newBalance) => {
        const user = userService.getOneById(userId)

        // Обновление значения в БД
        user.balance = newBalance
    }
}

module.exports.userService = userService
