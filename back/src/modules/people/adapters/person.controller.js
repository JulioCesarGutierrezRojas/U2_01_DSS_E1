const personService = require ('./person.service')


const registerPerson = async (req, res) => {
    try {
        const person = await personService.savePerson(req.body);
        res.status(201).json({ message: person });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Mostrar personas
const getAllPerson = async (req, res) => {
    try {
        const person = await personService.getAllPersons();
        res.status(200).json(person);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//Actualizar persona
const updatePerson= async (req, res) => {
    try {
        const person = await personService.updatePerson(req.params.id, req.body);
        res.status(200).json({ message: person });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Eliminar persona
const deletePerson = async (req, res) => {
    try {
        const person = await personService.deletePerson(req.params.id);
        res.status(200).json({ message: person });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerPerson,
    getAllPerson,
    updatePerson,
    deletePerson
}