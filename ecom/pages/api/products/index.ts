import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/db/models/product.model";
import { connectDB } from "@/lib/db";
import { isAuthenticated } from "@/middleware/auth";
import { isAdmin } from "@/middleware/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    switch (req.method) {
        case "GET":
            await isAuthenticated(req, res, async () => {
                const products = await Product.find({});
                res.status(200).json(products);
            });
            break;
        case "POST":
            await isAuthenticated(req, res, async () => {
                await isAdmin(req, res, async () => {
                    const product = new Product(req.body);
                    await product.save();
                    res.status(201).json(product);
                });
            });
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}