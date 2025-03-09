// Controllers for the auth.router endpoints :D

import pool from "../db.js";


const register = async (req, res) => {

    const { name, email, password } = req.body; 

    const newUser = {
        name,
        email,
        password
    }

    try {
        const resDB = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password])
        res.json(resDB.rows[0])

    } catch(error) {
        res.send(error)
    }
}

const login = async (req, res) => {

}

export {register, login};
