var express = require('express');
var router = express.Router();
var { store, deleteLink, reorderLinks } = require('../controllers/linkController')

var { isAuthenticated } = require('../middlewares/isAuthenticated')

router.post('/', isAuthenticated, store)
router.put('/reorder', isAuthenticated, reorderLinks)
router.delete('/:id', isAuthenticated, deleteLink)

module.exports = router;