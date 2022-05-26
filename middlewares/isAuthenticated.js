const { errorResponse } = require('../helpers/response')
var authService = require('../services/auth')

exports.isAuthenticated = (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1]
    if (token) {
        const isVerified = authService.verifyToken(token)
        if (isVerified) {
            req.user = isVerified
            return next()
        }
    }
    res.status(401)
    res.send(errorResponse('Please Login'))
}