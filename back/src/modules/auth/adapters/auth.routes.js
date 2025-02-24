const { Router } = require('express')
const authController = require('./auth.controller')
const { protectedEndpoint } = require('../../../config/jwt')

const authRouter = Router()

authRouter.post('/', [], authController.signin)
authRouter.patch('/:id', protectedEndpoint('admin'), authController.changePassword)
authRouter.get('/', protectedEndpoint('admin'), authController.getAllLogs)

module.exports = {
    authRouter
}