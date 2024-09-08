

const { signup, login } = require('../Controllers/AuthControl');
const { signupValidation, loginValidation } = require('../Middlewares/Authvalidation');

const router = require('express').Router();


router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports  = router;