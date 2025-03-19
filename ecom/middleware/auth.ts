import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";

interface CustomNextApiRequest extends NextApiRequest {
    userId?: string;
    isAdmin?: boolean;
}

export const isAuthenticated = async (req: CustomNextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    await connectDB();

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; isAdmin: boolean };
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        next(req, res);
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
};