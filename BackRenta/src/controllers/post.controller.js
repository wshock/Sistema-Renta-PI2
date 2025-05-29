import pool from "../db.js";

const post = async (req, res) => {
  // create a post, se requiere el id del usuario que crea el post
  try {
    const {
      user_id,
      title,
      description,
      price,
      rental_duration,
      rental_unit,
      status,
      type_post
    } = req.body;

    // Conversión de tipos
    const parsedUserId = parseInt(user_id);
    const parsedPrice = parseFloat(price);
    const parsedRentalDuration = parseInt(rental_duration);

    if (
      isNaN(parsedUserId) ||
      isNaN(parsedPrice) ||
      parsedPrice < 0 ||
      isNaN(parsedRentalDuration) ||
      parsedRentalDuration <= 0
    ) {
      return res.status(400).json({ error: "Datos inválidos para el post" });
    }

    const result = await pool.query(
      `INSERT INTO posts 
        (user_id, title, description, price, rental_duration, rental_unit, status, type_post) 
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        parsedUserId,
        title,
        description,
        parsedPrice,
        parsedRentalDuration,
        rental_unit,
        status,
        type_post
      ]
    );

    res.status(201).json({
      message: "Post creado correctamente",
      post: result.rows[0]
    });
  } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

const getPosts = async (req, res) => {
  // listar los posts en el feed
    try {
    const result = await pool.query('SELECT * FROM posts ORDER BY date_created DESC');
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener posts:', err);
    return res.status(500).json({ message: 'Error interno del servidor', error: err });
  }
};

const editPost = async () => {
  // el usuario debería poder editar contenido de su post
};

const getUserPosts = async (req, res) => {
  // obtener los posts de un usuario específico
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID de usuario inválido" });
  }

  try {
    const result = await pool.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY date_created DESC', [userId]);
    return res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener posts del usuario:', err);
    return res.status(500).json({ message: 'Error interno del servidor', error: err });
  }
}

const deletePost = async (req, res) => {
  // eliminar un post por su ID
  const postId = parseInt(req.params.id);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "ID de post inválido" });
  }

  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    return res.status(200).json({ message: "Post eliminado correctamente", post: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar el post:', err);
    return res.status(500).json({ message: 'Error interno del servidor', error: err });
  }
};

export { post, getPosts, editPost, getUserPosts, deletePost };
