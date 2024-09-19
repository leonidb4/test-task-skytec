const { port } = require('../config')

const [userId, action, value] = process.argv.slice(2);

fetch(`http://localhost:${port}/payment/${userId}`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        action,
        value
    })
}).then(response => {
    console.log(response.status, response.statusText)
})
