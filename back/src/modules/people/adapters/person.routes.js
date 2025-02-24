const { Router } = require('express')
const personController = require('./person.controller')
const { protectedEndpoint } = require('../../../config/jwt')

const personRouter = Router()

personRouter.post('/register', [protectedEndpoint('admin')], personController.registerPerson)
personRouter.get('/getAll', [protectedEndpoint('admin')], personController.getAllPerson)
personRouter.put('/update/:id', [protectedEndpoint('admin')], personController.updatePerson)
personRouter.delete('/delete/:id', [protectedEndpoint('admin')], personController.deletePerson)

module.exports ={
    personRouter
}