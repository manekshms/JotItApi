const { validationResult, body, param} = require("express-validator");

const validateCreateNote = [
    body("description").trim().not().isEmpty().withMessage("Description field is required")
        .isLength({min: 5}).withMessage("Description mush be atleast 6 characters")
        .isLength({max: 500}).withMessage("Description must be less than 499 characters"),

    (req, res, next) => {
        const result = validationResult(req);

        if(!result.isEmpty()) {
            res.status(400).send({
                error: {
                    code: 'FIELDS_VALIDATION_ERROR',
                    message: 'One or more fields raised validation errors',
                    fields: result.errors
                }
            })
        }

        return next();
    }
];

const validateUpdateNote = [
    body("description").trim().not().isEmpty().withMessage("Description field is required")
        .isLength({min: 5}).withMessage("Description mush be atleast 6 characters")
        .isLength({max: 500}).withMessage("Description must be less than 499 characters"),
    (req, res, next) => {
        const result = validationResult(req);

        if(!result.isEmpty()) {
            res.status(400).send({
                error: {
                    code: 'FIELDS_VALIDATION_ERROR',
                    message: 'One or more fields raised validation errors',
                    fields: result.errors
                }
            })
        }

        // validate request body
        const validReqBodyParams = ['description'];
        const hasInvalidData = Object.keys(req.body).every( param => validReqBodyParams.includes(param));
        if(!hasInvalidData) {
            return res.status(400).send({
                error: {
                    code: 'INVALID_FIELDS',
                    message: 'Invalid request'
                }
            });
        }

        if(!req.params.id) {
            return res.status(400).send({
                error: {
                    code: 'INVALID_PARAMS',
                    message: 'Invalid request'
                }
            });
        }

        return next();
    }
];

const validateDeleteNoteById = [
    param("id").trim().not().isEmpty().withMessage("Invalid request"),
    (req, res, next) => {
        const result = validationResult(req);

        if(!result.isEmpty()) {
            res.status(400).send({
                error: {
                    code: 'INVALID_PARAMS',
                    message: 'Invalid request',
                }
            })
        }

        return next();
    }
];

module.exports = {
    validateCreateNote,
    validateUpdateNote,
    validateDeleteNoteById
}