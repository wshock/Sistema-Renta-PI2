import pool from "../db.js";

const getProfile = async () => {
    // Lógica para obtener los datos del perfil del usuario y mostrarlos en el cliente
}

const editProfile = async (req, res) => {

    const { name, bio } = req.body;

    try {
        const resDB = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);

        if (resDB.rows.length === 0) return res.status(404).json({message: "User not found"});

        await pool.query("UPDATE users SET name = $1, bio = $2 WHERE id = $3 RETURNING *;", [name, bio, req.user.id]);

        return res.status(200).json({ message: "Updated successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Error updating user"})
    }
}

export { getProfile, editProfile }