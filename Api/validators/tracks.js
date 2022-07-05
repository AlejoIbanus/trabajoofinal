const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');


const validatorCreateItems = [
    check('name')
    .exists()
    .notEmpty()
    .withMessage('El campo nombre no puede enviarse vacio'),
    (req,res,next) => {
        return validateResults(req,res,next)
    }
];

const validatorGetItem = [
    check('id')
    .exists()
    .notEmpty()
    .isMongoId(),
    (req,res,next) => {
        return validateResults(req,res,next)
    }
];



module.exports = {validatorCreateItems, validatorGetItem}

