process.loadEnvFile()
const express = require('express')
const cors = require('cors')
const { logger } = require('../config/Logger')
const { authRouter } = require('../modules/router')

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(cors({origins: '*'}))
app.use(express.json({limit: '50mb'}))

app.use(logger)

app.get('/', (request, response) => {
    response.send('Esto es lo que viene a ser el APIRest')
})

/**
 * Endpoints
 * 
 * En esta parte se pone lo que son los endpoints que maneja la API
 * se ponen de la siguiente manera:
 * 
 * app.use('lo que es el endpoint', la ruta)
 * 
 * Por ruta se entiende que son las que se traen del archivo router,
 * las cuales se importaron mas arriba
 */

app.use('/api/auth', authRouter)

module.exports = {
    app
}