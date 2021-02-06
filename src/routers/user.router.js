const router = require('express').Router();
const { getUsers } = require('../modules/user/user.controller');
const verifyToken = require('../middleware/verifyToken.middleware');

router.get('/users',verifyToken, getUsers);

module.exports = router