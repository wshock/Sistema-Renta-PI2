// Controllers for the auth.router endpoints :D

import pool from "../db.js";
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
import 'dotenv/config'
import jwt from 'jsonwebtoken';

const register = async (req, res) => {

    const { name, email, password } = req.body; 


    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const resDB = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        )

        const dbReturn = resDB.rows[0]
        
        const token = await createAccessToken({id: dbReturn.id})
        res.cookie('token', token);
        res.json({
            id: dbReturn.id,
            name: dbReturn.name,
            email: dbReturn.email
        })

    } catch(error) {
        if (error.code === "23505") res.status(409).json(["Este email ya está en uso, prueba con otro."]) // Status que se devuelve si se intenta registrar con un email ya registrado.
        else { res.status(500).json({ message: error.message }) }                    // HTTP 409: Conflict
    }
}

const login = async (req, res) => {

    const {email, password} = req.body

    try {

        const resDB = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )
        
        if (resDB.rows.length === 0) return res.status(404).json(["Email o contraseña incorrectos"]);

        const dbReturn = resDB.rows[0]

        const isMatch = await bcrypt.compare( password, dbReturn.password )
        if (!isMatch) return res.status(400).json(["Email o contraseña incorrectos"]); // HTTP 400: bad request

        const token = await createAccessToken({ id: dbReturn.id })
        res.cookie('token', token);
        res.json({
            id: dbReturn.id,
            name: dbReturn.name,
            email: dbReturn.email
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    return res.sendStatus(200);
}

const profile = async (req, res) => {
        
    try {                                                                                       // Se recibe una req a profile habiendo ya pasado por el 
        const resDB = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id])      // middleware de validateToken, por lo que el user que está
                                                                                                // intentando entrar tiene un token verificado del cual puedo
        if (resDB.rows.length === 0) return res.status(404).json({message: "User not found"});  // acceder a sus datos a través de req.user (debido a que se
                                                                                                // seteo previamente en el middleware), y acceder directamente
        const dbReturn = resDB.rows[0]                                                          // al id para buscar en mi bd los datos del user con ese id.

        return res.json({
            id: dbReturn.id,
            name: dbReturn.name,
            email: dbReturn.email
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const verifyToken = (req, res) => {
    const { token } = req.cookies; 

    if (!token) return res.status(401).json({ message: "Unauthorized" }); // HTTP 401: Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return res.status(401).json({ message: "Invalid token" }); 
        
        req.user = user; // le asigno los datos de el token verificado a req.user para que pueda ser usado posteriormente
                         // en las funciones/rutas siguientes a este middleware.   
    })
}

export { register, login, logout, profile, verifyToken };
