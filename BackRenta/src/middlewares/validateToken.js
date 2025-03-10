import 'dotenv/config';
import jwt from 'jsonwebtoken';

// Middleware for the validation of the tokens
export const validateToken = (req, res, next) => {
    
    const { token } = req.cookies; 

    if (!token) return res.status(401).json({ message: "Unauthorized" }); // HTTP 401: Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return res.status(401).json({ message: "Invalid token" }); 
        
        req.user = user; // le asigno los datos de el token verificado a req.user para que pueda ser usado posteriormente
                         // en las funciones/rutas siguientes a este middleware.   
        next();
    })

}