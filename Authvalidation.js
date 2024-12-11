const Joi = require('joi');  


const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .pattern(/^[A-Za-z]+$/)
            .messages({
                'string.base': 'Name must be a string.',
                'string.empty': 'Name is required.',
                'string.min': 'Name must be at least 3 characters long.',
                'string.max': 'Name must be at most 20 characters long.',
                'string.pattern.base': 'Name should contain only letters (no digits or special characters).'
            })
            .required(),
        email: Joi.string()
            .email()
            .messages({
                'string.base': 'Email must be a string.',
                'string.empty': 'Email is required.',
                'string.email': 'Email must be a valid email address.'
            })
            .required(),
        password: Joi.string()
            .min(8)
            .max(20)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
            .messages({
                'string.base': 'Password must be a string.',
                'string.empty': 'Password is required.',
                'string.min': 'Password must be at least 8 characters long.',
                'string.max': 'Password must be at most 20 characters long.',
                'string.pattern.base': 'Password must contain at least one letter, one digit, and one special character (!@#$%^&*).'
            })
            .required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const messages = error.details.map(detail => detail.message); // Extract messages
        return res.status(400).json({
            success: false,
            message: messages[0], // Join messages into a single string
        });
    }
    next();
};




const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),  
        password: Joi.string().min(5).max(20).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad request', error: error.details[0].message });
    }
    next();
};

const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address.',
            'string.empty': 'Email is required.',
        }),
        password: Joi.string()
            .min(8)
            .max(20)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
            .messages({
                'string.base': 'Password must be a string.',
                'string.empty': 'New password is required.',
                'string.min': 'Password must be at least 8 characters long.',
                'string.max': 'Password must be at most 20 characters long.',
                'string.pattern.base': 'Password must contain at least one letter, one digit, and one special character (!@#$%^&*).',
            })
            .required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0],
        });
    }

    next();
};

module.exports = {
    signupValidation,
    loginValidation,
    resetPasswordValidation, 
};

