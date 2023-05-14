import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = "SUPER SECRET"

type AuthRequest = Request & { user?: User }

export async function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    //Authentication
    const authHeader = req.headers["authorization"]
    const jwtToken = authHeader?.split(" ")[1]
    if (!jwtToken) {

    }
    //decode the jwt token
    try {
        const payload = (await jwt.verify(jwtToken, JWT_SECRET)) as { tokenId: number }

        const dbToken = await prisma.token.findUnique({
            where: {id: payload.tokenId},
            include: {user: true}
        })

        if (!dbToken?.valid || dbToken.expiration < new Date()) {
            return res.status(401).json({error: "API token is not valid or expired"})
        }

        req.user = dbToken.user
    } catch (e) {
        return res.sendStatus(401)
    }
    next()
}
