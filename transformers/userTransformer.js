const userTransformer = (user) => {
    delete user['dataValues']['password']
    return user
}

exports.userTransformer = userTransformer