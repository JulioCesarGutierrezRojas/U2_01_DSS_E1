const { Person } = require('../../people/entities/Person')
const { Rol } = require('../../people/entities/Rol')
const { generateToken, verifyToken } = require('../../../config/jwt')
const { hashPayload, comparePayload } = require('../../../utils/functions')
const sequelize = require('../../../config/database')

const signin = async (email, password) => {
    if (!email || !password)
        throw new Error('Missing fields')

    const user = await Person.findOne({
        where: { correo: email },
        include: {
            model: Rol,
            attributes: ['nombreRol']
        }
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
                userRole: user.Rol.nombreRol,
                userName: user.nombre + user.apellidos
            })

            const role = user.Rol.nombreRol
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

module.exports = {
    signin,
    changePassword
}