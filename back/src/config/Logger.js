// logger.js
const { Log } = require('../modules/auth/entities/Log');
const { verifyToken } = require("./jwt");

const logger = async (req, res, next) => {
    try {
        let usuario = 'No autenticado'
        const authHeader = req.headers['authorization']

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            if (token) {
                const decoded = verifyToken(token)
                usuario = decoded ? decoded.userName : usuario
            }
        }

        const fecha = new Date().toISOString()
        const operacion = `${req.method} ${req.originalUrl}`

        // Intentamos guardar el log; si falla, lo registramos en consola pero seguimos con la ejecución.
        await Log.create({
            nombreUsuario: usuario,
            fecha: fecha,
            operacion: operacion
        })
    } catch (error) {
        console.error('Error al registrar log:', error)
    }

    next()
};

module.exports = {
    logger
}
