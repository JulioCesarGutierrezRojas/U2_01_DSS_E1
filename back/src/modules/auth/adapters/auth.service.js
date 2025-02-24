const { Person } = require('../../people/entities/Person')
const { generateToken, verifyToken } = require('../../../config/jwt')
const { hashPayload, comparePayload } = require('../../../utils/functions')
const sequelize = require('../../../config/database')

const signin = async (email, password) => {
    if (!email || !password)
        throw new Error('Missing fields')

    const user = await Person.findOne({
        where: { correo: email },
    })

    if (!user) {
        throw new Error('Incorrect Email or Password')
    } else {
        const compare = await comparePayload(password, user.contrasenia)

        if (!compare) {
            throw new Error('Incorrect Email or Password')
        } else {
            const token = generateToken({
                userEmail: user.correo,
                userRole: user.rol,
                userName: `${user.nombre} ${user.apellidos}`
            })

            const role = user.rol
            const id = user.idUsuario

            return {token, role, id}
        }
    }
}

const changePassword = async (password, idUser) => {
    if (!password || !idUser)
        throw new Error('Missing fields')

    const user = await Person.findOne({
        where: { idUsuario: idUser }
    })

    if (!user) {
        throw new Error('User not found')
    } else {
        const updated = await user.update({
            contrasenia: await hashPayload(password)
        })

        if (!updated) {
            throw new Error('Error updating')
        }

        return message = 'Password updated sucessfully'
    }
}

const getAllLogs = async () => {
    const logs = await Log.findAll()

    return logs
}

module.exports = {
    signin,
    changePassword,
    getAllLogs
}