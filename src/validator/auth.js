const { check, validationResult } = require( "express-validator");

exports.validateRequest = [
    check('name')
      .notEmpty()
      .withMessage("Name is required"),
    check('email')
        .isEmail()
        .withMessage("Vaild Email is required"),
    check('password')
        .isLength({min:6})
        .withMessage("Password must be 6 charactor long")
];

exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next();
}