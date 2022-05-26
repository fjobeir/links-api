var models = require('../models')
const { Op } = require("sequelize");
const { successResponse, errorResponse } = require('../helpers/response');

exports.store = async (req, res) => {
    const title = req.body?.title
    const url = req.body?.url
    const [link, created] = await models.Link.findOrCreate({
        where: {
            [Op.and]: [
                {
                    url
                },
                {
                    userId: req.user.id
                }
            ]
        },
        defaults: {
            url,
            title,
            userId: req.user.id,
            linkOrder: '1'
        }
    })
    if (created) {
        res.send(successResponse('Link has been added'))
    } else {
        res.send(errorResponse('You have already added this link'))
    }
}

exports.reorderLinks = async (req, res) => {
    // do not repeat IDs
    // IDs shoule be really owned by the user
    const newOrder = req?.body?.newOrder
    if (Array.isArray(newOrder) && newOrder?.length > 0) {
        for (var i = 0; i < newOrder.length; i++) {
            // Make sure about the currentLink value (is it really a model or null)
            var currentLink = await models.Link.findByPk(newOrder[i])
            currentLink.linkOrder = (i + 1)
            currentLink.save()
        }
        res.send(successResponse('Links order has beeen updated'))
        return
    }
    res.send(errorResponse('Your entry is invalid'))
}

exports.deleteLink = async (req, res) => {
    const id = +req.params.id
    const user = req.user
    const link = await models.Link.findByPk(id)
    if (link) {
        if (user.id == link.userId) {
            const deleted = await models.Link.destroy({
                where: {
                    id: id
                }
            })
            if (deleted) {
                res.send(successResponse('Link has been deleted'))
                return
            }
        }
    }
    res.send(errorResponse('An error occurred while deleting link'))
}