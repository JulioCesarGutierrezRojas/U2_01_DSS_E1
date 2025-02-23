process.loadEnvFile()
const bcrypt = require('bcrypt')

// Funcion para hashear la contrasenia
const hashPayload = async (payload) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(payload, salt)
}

// Funcion para compara hashes
const comparePayload = async (payload, hashedPayload) => {
    return await bcrypt.compare(payload, hashedPayload)
}

module.exports = {
    hashPayload,
    comparePayload
}