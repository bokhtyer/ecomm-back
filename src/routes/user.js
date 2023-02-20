const express = require('express');
const signup = require('../controller/user');
const login = require('../controller/login');
const logout = require('../controller/logout');
const { isRequestValidated,validateRequest } = require('../validator/auth');
const router = express.Router();


router.post('/signup',validateRequest, isRequestValidated, signup);
router.post('/login', login);
router.post('/logout', logout);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;