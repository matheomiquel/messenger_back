import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function authMiddleware(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
  try {
    const bearer = req.headers.authorization as string;
    if (!bearer) {
      return res.status(401).send("A token is required for this functionality");
    }
    const token = bearer.split(" ")[1];
    verify(String(token), String(process.env.PRIVATE_KEY));
    req.headers.token = token;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}
