const {Person} = require('../entities/Person')
const { hashPayload } = require('../../../utils/functions')
const sequelize = require('../../../config/database')

//Registrar persona
const savePerson = async (payload) => {
    if (!payload.nombre || !payload.apellidos || !payload.correo || !payload.contrasenia || !payload.telefono || !payload.edad || !payload.rol )
        throw new Error('Missing fields')

    const duplicateEmail = await Person.findOne({
        where: {
            correo: payload.correo
        }
    })

    if (duplicateEmail)
        throw new Error('This email is already in use')

    try {
        const result = await sequelize.transaction(async (transaction) => {
            
            const person = await Person.create({
                nombre: payload.nombre,
                apellidos: payload.apellidos,
                correo: payload.correo,
                contrasenia: await hashPayload(payload.contrasenia),
                telefono: payload.telefono,
                edad: payload.edad,
                rol: payload.rol,
            })
    
            return message = 'Person registered succesfully'
        })

        return result
    } catch (error) {
        console.error("Error in savePerson:", error); 
        throw new Error('Failed to register user'); 
    }
    
}

//Mostrar todas las personas
const getAllPersons = async () => {
    try {

        const persons = await Person.findAll();

        return persons;

    } catch (error) {
        throw new Error('Failed to fetch persons');
    }
};

//Actualizar personb
const updatePerson = async (idUsuario, payload) => {

    if (!idUsuario) throw new Error('User ID is required');
    try {
        await Person.update({
            nombre: payload.nombre,
            apellidos: payload.apellidos,
            correo: payload.correo,
            contrasenia: await hashPayload(payload.contrasenia),
            telefono: payload.telefono,
            edad: payload.edad,
            rol: payload.rol,
        });

    } catch (error) {
        throw new Error('Failed to update person');
    }
};


//Eliminar persona
const deletePerson = async (idUsuario) => {
    if (!idUsuario) throw new Error('Person ID is required');

    try {

        const result = await Person.destroy({ where: { idUsuario }})

        return result;
    } catch (error) {
        throw new Error('Failed to delete person');
    }
};


module.exports = {
    savePerson,
    getAllPersons,
    updatePerson,
    deletePerson
}