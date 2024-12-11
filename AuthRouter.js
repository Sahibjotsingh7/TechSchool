

const { signup, login , forgotPassword ,verifyOTP,resetPassword ,emailReset ,deleteAccount} = require('../Controllers/AuthControl');
const { signupValidation, loginValidation,resetPasswordValidation } = require('../Middlewares/Authvalidation');

const router = require('express').Router();


router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password',resetPasswordValidation ,resetPassword);
router.post('/reset-email',emailReset);
router.delete('/delete-account', deleteAccount);



module.exports  = router;