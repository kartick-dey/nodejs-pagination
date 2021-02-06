const router = require('express').Router();

const {createUser, activateAccount, loginWithJwtToken, getEmail} = require('../modules/auth/auth.controller');

// Creating create user route
router.post('/create', createUser);
router.post('/confirmemail', activateAccount);
router.post('/login', loginWithJwtToken);
router.get('/get-email/:email', getEmail);

module.exports = router