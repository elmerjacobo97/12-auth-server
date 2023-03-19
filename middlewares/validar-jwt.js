import {response} from "express";
import jwt from 'jsonwebtoken';

export  const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: true,
            msg: 'Error en el token',
            token,
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Establecer el uid, name
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: true,
            msg: 'Token no válido',
        })
    }

    next();
}
