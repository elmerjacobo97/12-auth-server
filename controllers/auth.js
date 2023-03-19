import {request, response} from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from 'bcryptjs';
import {generarJWT} from "../helpers/jwt.js";

export const crearUsuario = async (req = request, res = response) => {
    const { name, email, password } = req.body;

    try {
        // Verificar el email
        const usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            })
        }

        // Crear el usuario con el modelo
        const dbUser = new Usuario(req.body);

        // Hash a la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Genera JWT
        const token = await generarJWT(dbUser.id, name);

        // Almacenar el usuario en BD
        await dbUser.save()

        // Generar respuesta exitosa
        res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el administrador'
        })
    }
}

export const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUser = await Usuario.findOne({ email });
        // console.log(dbUser)
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            })
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            })
        }

        // Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Respuesta del servicio
        res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email,
            token,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

export const revalidarToken = async (req = request, res = response) => {
    // Leer el uid, name
    const { uid, name } = req;

    // Leer la base de datos
    const dbUser = await Usuario.findById(uid);
    // console.log(dbUser)

    // Generar JWT
    const token = await generarJWT(uid, name);

    return res.status(200).json({
        ok: true,
        uid,
        name,
        email: dbUser.email,
        token,
    })
}
