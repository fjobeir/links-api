var express = require('express');
var router = express.Router();

var { signUp, signIn, show } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/me', isAuthenticated, show)
router.put('/', function() {})

module.exports = router;
