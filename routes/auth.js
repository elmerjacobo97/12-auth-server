import {Router} from 'express';
import {check} from "express-validator";
import {crearUsuario, loginUsuario, revalidarToken} from "../controllers/auth.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

export const router = Router();

// Crear usuario.
router.post('/new', [
    check('name', 'El nombre es obligatorio')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({min: 3}).withMessage('El nombre debe contener al menos 3 letras'),
    check('email', 'El email es obligatorio')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().bail().withMessage('El email ingresado no es válido'),
    check('password', 'La contraseña es requerida')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({min: 6}).withMessage('La contraseña requiere mínimo 6 caracteres')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe contener al menos un carácter especial'),
    validarCampos,
], crearUsuario);


// Login del usuario.
router.post('/', [
    check('email', 'El email es obligatorio')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().bail().withMessage('El email ingresado no es válido'),
    check('password', 'La contraseña es requerida')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({min: 6}).withMessage('La contraseña requiere mínimo 6 caracteres')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe contener al menos un carácter especial'),
    validarCampos
], loginUsuario);

// Validar y revalidar token
router.get('/renew', validarJWT, revalidarToken);

