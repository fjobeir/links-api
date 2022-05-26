var models = require('../models')
var { errorResponse, successResponse } = require('../helpers/response')
const { Op } = require("sequelize");
var authService = require('../services/auth')
var { userTransformer } = require('../transformers/userTransformer')

async function signUp(req, res, next) {
    const username = req?.body?.username
    const email = req?.body?.email
    const name = req?.body?.name
    const password = req?.body?.password
    if (username?.length < 4) {
        res.send(errorResponse('Username is invalid'))
    }
    if (name?.length < 4) {
        res.send(errorResponse('Name is invalid'))
    }
    if (password?.length < 4) {
        res.send(errorResponse('Password is invalid'))
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        res.send(errorResponse('Email is invalid'))
    }
    const [user, created] = await models.User.findOrCreate({
        where: {
            [Op.or]: [
                { username },
                { email }
            ]
        },
        defaults: {
            name,
            password: authService.hashPassword(password),
            username,
            email
        }
    })
    if (created) {
        res.send(successResponse('User created successfully'))
    } else {
        res.send(errorResponse('User is already registered'))
    }
}

async function signIn(req, res, next) {
    var email = req.body.email
    var password = req.body.password
    const user = await models.User.findOne({
        where: {
            email
        }
    })
    if (user) {
        if (authService.comparePasswords(password, user.password)) {
            res.send(successResponse('', [], {token: authService.signUser(user)}))
        } else {
            res.send(errorResponse('Password is wrong'))
        }
    } else {
        res.send(errorResponse('Username is wrong'))
    }
}

async function show(req, res) {
    const currentUser = await models.User.findByPk(req.user.id, {
        include: [{
            model: models.Link,
        }],
    })
    if (currentUser) {
        res.send(successResponse('', {user: userTransformer(currentUser)}))
    } else {
        res.send(errorResponse('There was an error'))
    }
}

module.exports = {
    signUp,
    signIn,
    show
}