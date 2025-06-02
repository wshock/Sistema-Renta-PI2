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

    console.log(req.body);

    const photo = req.file ? req.file.filename : null;

    // Conversión de tipos
    const parsedUserId = parseInt(user_id);
    const parsedPrice = parseFloat(price);
    const parsedRentalDuration = parseInt(rental_duration);
    console.log("Parsed values:", {
      user_id: parsedUserId,
      price: parsedPrice,
      rental_duration: parsedRentalDuration
    });

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
       (user_id, type_post, title, description, price, rental_duration, rental_unit, status, photo)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        user_id,
        type_post,
        title,
        description,
        price,
        rental_duration,
        rental_unit,
        status,
        photo,
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
    const result = await pool.query(`
      SELECT 
        posts.*, 
        users.name AS name, 
        users.email AS email
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      ORDER BY posts.date_created DESC
    `);
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

const searchPosts = async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Consulta inválida' });
  }

  try {
    const result = await pool.query(
      `SELECT 
        posts.*, 
        users.name AS name, 
        users.email AS email
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      WHERE LOWER(posts.title) LIKE LOWER($1) 
          OR LOWER(posts.description) LIKE LOWER($1)`,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export { post, getPosts, editPost, getUserPosts, deletePost, searchPosts };
