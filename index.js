import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {router} from "./routes/auth.js";
import {dbConnection} from "./db/config.js";

const app = express();
dotenv.config();

// Base de datos
dbConnection();

// Directorio Público
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', router);

// Crear servidor de express
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
