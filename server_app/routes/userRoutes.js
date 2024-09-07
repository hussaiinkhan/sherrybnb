const express = require('express');
const { registerUser, loginUser, infoUser } = require('../controllers/userController');
const validateToken = require('../middlewares/validateTokenHandler');
const router = express.Router();

// Public routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Private route (infoUser is responsible for handling the token in cookies)
router.get('/info',validateToken, infoUser);

module.exports = router;
