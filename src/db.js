module.exports.tables = {
    /**
     * users
     * @type {{ id: number; balance: string; }[]}
     */
    users: [{
        id: 1,
        balance: '0',
    }],

    /**
     * @type {{ user_id: number; action: 'PAY' | 'CHARGE'; amount: string; ts: number }[]}
     */
    payments: []
}
