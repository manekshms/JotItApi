const {check, body, validationResult} = require("express-validator");

const createUserValidator = [
    body('name').trim().not().isEmpty().withMessage("Name is required")
        .isLength({min: 5}).withMessage("Name must contain atleast 5 characters")
        .isLength({max: 8}).withMessage("Name must be lessthan or equal 8 characeters"),

    body("email").trim().not().isEmpty().withMessage("Email is required")
        .isLength({min: 5}).withMessage("Email must be greater than 5 characters")
        .isLength({max: 20}).withMessage("Email must be less than or equal to 20 characters")    
        .isEmail().withMessage("Enter valid email address"),

    body("age").trim().not().isEmpty().withMessage("Age is required")
        .isInt().withMessage("Age must be number")
        .isInt({min: 12}).withMessage("Age must be greater than 12")
        .isInt({max: 100}).withMessage("Age must be lessthan or equal to 100"),

    body("gender").trim().not().isEmpty().withMessage("Gender is required")
        .custom( value => ['male', 'female'].includes(value) ).withMessage("Invalid Gender"),
    
    body("username").trim().not().isEmpty().withMessage("Username is required")
        .isLength({min: 5}).withMessage("Username must be greater than or equal to 5 characters")
        .isLength({max: 20}).withMessage("Username must be less than or equal to 20 characters")
        .matches(/^[a-zA-Z0-9]*[a-zA-Z0-9]$/).withMessage("Username must contain only alpha numeric characters"),

    body("password").trim().not().isEmpty().withMessage("Password is required")
        .isLength({min: 5}).withMessage("Password must be greater than or equal to 8 characters")
        .isLength({max: 20}).withMessage("Password must be less than or equal to 20 characters")
        .matches(/[a-z]/).withMessage("Password must contain atleast one lowercase character")
        .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase character")
        .matches(/[0-9]/).withMessage("Password must contain atleast one number")
        .matches(/[@!#\$\^&\*\\\(\)\[\]]/).withMessage("Password must contain atleast one special character"),

    (req, res, next) => {
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(400).send({
                error:{ 
                    code: 'FIELDS_VALIDATION_ERROR',
                    message: 'One or more fields raised validation errors',
                    fields: result.errors
                }
            });
        }
        next();
    }
];

const updateUserValidator = [ async (req, res, next) => {

    if(req.body.email !== undefined) {
        await body("email").trim().not().isEmpty().withMessage("Email is required")
            .isLength({min: 5}).withMessage("Email must be greater than 5 characters")
            .isLength({max: 20}).withMessage("Email must be less than or equal to 20 characters")    
            .isEmail().withMessage("Enter valid email address").run(req);
    }

    if(req.body.name !== undefined) {
        await body('name').trim().not().isEmpty().withMessage("Name is required")
            .isLength({min: 5}).withMessage("Name must contain atleast 5 characters")
            .isLength({max: 8}).withMessage("Name must be lessthan or equal 8 characeters").run(req);
    }

    if(req.body.age !== undefined) {
        await body("age").trim().not().isEmpty().withMessage("Age is required")
            .isInt().withMessage("Age must be number")
            .isInt({min: 12}).withMessage("Age must be greater than 12")
            .isInt({max: 100}).withMessage("Age must be lessthan or equal to 100").run(req);
    }

    if(req.body.gender !== undefined) {
        await body("gender").optional({checkFalsy: true}).trim().not().isEmpty().withMessage("Gender is required")
            .custom( value => ['male', 'female'].includes(value) ).withMessage("Invalid Gender").run(req);
    }

    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).send({
            error:{ 
                code: 'FIELDS_VALIDATION_ERROR',
                message: 'One or more fields raised validation errors',
                fields: result.errors
            }
        });
    }
    // validate request body
    const validReqBodyParams = ['name', 'email', 'age', 'gender'];
    const hasInvalidData = Object.keys(req.body).every( param => validReqBodyParams.includes(param));
    if(!hasInvalidData) {
        return res.status(400).send({
            error: {
                code: 'INVALID_FIELDS',
                message: 'Invalid request'
            }
        });
    }
    next();
}]

module.exports = {
    createUserValidator,
    updateUserValidator
}
