import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const bearer = req.headers["authorization"] as String
        if (!bearer) {
            return res.status(401).send("A token is required for this functionality");
        }
        const token = bearer.split(' ')[1]
        verify(String(token), String(process.env.PRIVATE_KEY));
        req.headers.token = token

        next()
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
}