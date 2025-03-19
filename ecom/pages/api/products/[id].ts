import { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/db/models/product.model";
import { connectDB } from "@/lib/db";
import { isAuthenticated } from "@/middleware/auth";
import { isAdmin } from "@/middleware/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { id } = req.query;

    switch (req.method) {
        case "GET":
            await isAuthenticated(req, res, async () => {
                const product = await Product.findById(id);
                if (!product) {
                    return res.status(404).json({ message: "Product not found" });
                }
                res.status(200).json(product);
            });
            break;
        case "PUT":
            await isAuthenticated(req, res, async () => {
                await isAdmin(req, res, async () => {
                    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
                    if (!updatedProduct) {
                        return res.status(404).json({ message: "Product not found" });
                    }
                    res.status(200).json(updatedProduct);
                });
            });
            break;
        case "DELETE":
            await isAuthenticated(req, res, async () => {
                await isAdmin(req, res, async () => {
                    const deletedProduct = await Product.findByIdAndDelete(id);
                    if (!deletedProduct) {
                        return res.status(404).json({ message: "Product not found" });
                    }
                    res.status(200).json({ message: "Product deleted" });
                });
            });
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}