process.loadEnvFile()
const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME })
}

const verifyToken = (generatedToken) => {
    try {
        if (!generatedToken)
            throw new Error('Token not provided')

        const decoded = jwt.verify(generatedToken, process.env.SECRET)

        return decoded
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('The token has expired')
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid Token JWT')
        } else {
            throw new Error(`Error verifying the token: ${error.name}`)
        }
    }
}

const protectedEndpoint = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const tokenAuth = req.headers['authorization']

            if (!tokenAuth)
                return res.status(401).json({message: 'Token not provided'})

            const token = tokenAuth.split(' ')[1]

            const decoded = verifyToken(token)

            if (!decoded)
                return res.status(401).json({message: 'Invalid token'})

            req.email = decoded.userEmail
            req.role = decoded.userRole

            if (!allowedRoles.includes(req.role))
                return res.status(403).json({message: 'You dont have permission to access this resource'})

            next()
        } catch (error) {
            console.log(error)
            res.status(400).json({message: `Ups, we have a problem: ${error.message}`})
        }
    }
}

module.exports = {
    generateToken,
    verifyToken,
    protectedEndpoint
}