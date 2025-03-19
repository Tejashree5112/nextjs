import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import User from "@/lib/db/models/user.model";
import { connectDB } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === "POST") {
        const { name, email, password, isAdmin } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}