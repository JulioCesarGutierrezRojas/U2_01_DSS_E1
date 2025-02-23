const { app } = require('./config/server')
const sequelize = require('./config/database')
const {Person} = require("./modules/people/entities/Person");
const {hashPayload} = require("./utils/functions");

const main = async () => {
    try {
        app.listen(app.get('port'))
        console.log(`Running in http://localhost:${app.get('port')}/`)

        await sequelize.authenticate()
        console.log('Connection has been established successfully.')

        const existAdmin = await Person.findOne({
            where: {
                rol: 'admin'
            }
        })

        if (existAdmin) {
            console.log('El administrador ya esta registrado')
        } else {
            await Person.create({
                nombre: 'Admin',
                apellidos: 'Admin Admin',
                correo: 'admin@gmail.com',
                contrasenia: await hashPayload('admin'),
                telefono: 7771234567,
                edad: 30,
                rol: 'admin'
            })

            console.log('Administrador registrado correctamente')
        }
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
}

main()