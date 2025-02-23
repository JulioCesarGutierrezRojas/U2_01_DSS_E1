const { Router } = require('express')
const authController = require('./auth.controller')
const { protectedEndpoint } = require('../../../config/jwt')

const authRouter = Router()

authRouter.post('/', [], authController.signin)
authRouter.patch('/:id', protectedEndpoint('admin'), authController.changePassword)

module.exports = {
    authRouter
}