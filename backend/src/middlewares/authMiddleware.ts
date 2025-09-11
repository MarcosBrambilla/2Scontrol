import jwtService, { type JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: "Token não fornecido!" })

    const [, token] = authHeader.split(" ");

    try {
        const jwtKey = process.env.JWT_SECRET as string;
        const decoded = jwtService.verify(jwtKey, jwtKey) as JwtPayload;

        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({error: "Token inválido ou expirado! "})
    }

}