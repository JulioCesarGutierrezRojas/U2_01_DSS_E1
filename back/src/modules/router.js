const { authRouter } = require('./auth/adapters/auth.routes')
const { personRouter } = require('./people/adapters/person.routes')

module.exports = {
    authRouter,
    personRouter,
}
