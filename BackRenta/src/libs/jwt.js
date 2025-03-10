import 'dotenv/config'
import jwt from "jsonwebtoken"

export function createAccessToken(payload){

    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Secret para validar el token
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err); // si hay un error se lanza el reject de la promise con el err
                resolve(token) // si todo sale bien se lanza el resolve de la promise con el token generado
            }
        )
    })

}