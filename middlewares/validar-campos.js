import {validationResult} from "express-validator";
import {response} from "express";

export const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);

    // Si errors es un arreglo vacío, entonces todo bien caso contrario, hay errores.
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        })
    }

    // Si no hay errores, procede al siguiente middleware.
    next();
}
