

const {check} = require('express-validator');
const validateResults = require('../utils/handleValidator');


const validatorRegisterItem = [
    check('name')
    .exists()
    .notEmpty()
    .withMessage('El campo de tu nombre no puede estar vacio')
    .isLength({min:3,max:99})
    .withMessage('Tu nombre debe tener entre 3 y 99 caracteres'),
    check('age')
    .exists()
    .notEmpty()
    .withMessage('El campo de tu edad no puede estar vacio')
    .isNumeric()
    .withMessage('El campo de tu edad debe ser un numero'),
    check('password')
    .exists()
    .notEmpty()
    .withMessage('El campo de tu contraseña no puede estar vacio')
    .isLength({min:3,max:15})
    .withMessage('Tu contraseña debe tener entre 3 y 15 caracteres'),
    check('email')
    .exists()
    .notEmpty()
    .withMessage('El campo de tu email no debe estar vacio')
    .isEmail()
    .withMessage('Tu email debe ser un email valido'),


    (req,res,next) => {
        return validateResults(req,res,next)
    }
];

const validatorLoginItem = [
    
    check('password')
    .exists()
    .notEmpty()
    .withMessage('La contraseña no puede estar vacia')
    .isLength({min:3,max:15})
    .withMessage('La clave debe tener entre 3 y 15 caracteres'),
    check('email')
    .exists()
    .notEmpty()
    .withMessage('El email no puede estar vacio')
    .isEmail()
    .withMessage('Debe tener el formato de un email valido'),

    (req,res,next) => {
        return validateResults(req,res,next)
    }
];

const validatorRecoveryEmailItem = [
    check('email')
    .exists()
    .notEmpty()
    .withMessage('Este campo no puede enviarse vacio')
    .isEmail()
    .withMessage('El email debe ser un email valido'),

    (req,res,next) => {
        return validateResults(req,res,next)
    }
];

const validatorReset = [
    check('password')
    .exists()
    .notEmpty()
    .withMessage('Este campo no puede enviarse vacio')
    .isLength({min:3,max:15})
    .withMessage('La clave debe tener entre 3 y 15 caracteres'),
    

    (req,res,next) => {
        const token = req.params.token;
        return validateResults(req,res,next)
    }
];
module.exports = {validatorRegisterItem, validatorLoginItem, validatorRecoveryEmailItem, validatorReset}