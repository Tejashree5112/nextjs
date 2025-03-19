import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import User from "@/lib/db/models/user.model";

// Extend NextApiRequest to include userId
interface CustomNextApiRequest extends NextApiRequest {
    userId?: string;
}

export const isAdmin = async (req: CustomNextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }
    next(req, res);
};