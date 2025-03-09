// Controllers for the auth.router endpoints :D

import pool from "../db.js";
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"

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
        if (error.code === "23505") res.status(409).json({ message: error.message }) // Status que se devuelve si se intenta registrar con un email ya registrado.
        else { res.status(500).json({ message: error.message }) }
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {

        const resDB = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        
        if (resDB.rows.length === 0) return res.status(404).json({message: "Email not found"});

        const dbReturn = resDB.rows[0]

        const isMatch = await bcrypt.compare( password, dbReturn.password )
        if (!isMatch) return res.status(400).json({message: "Incorrect password"});

        const token = await createAccessToken({id: dbReturn.id})
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

export {register, login, logout};
