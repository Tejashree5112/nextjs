// import { NextApiRequest, NextApiResponse } from "next";
// import { connectDB } from "@/lib/db";
// import Product from "@/lib/db/models/product.model";
// import Cart from "@/lib/db/models/cart.model";
// import { isAuthenticated } from "@/middleware/auth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await connectDB();

//     switch (req.method) {
//         case "POST":
//             await isAuthenticated(req, res, async () => {
//                 const { productId, quantity } = req.body;

//                 // Find the product by ID
//                 const product = await Product.findById(productId);
//                 if (!product) {
//                     return res.status(404).json({ message: "Product not found" });
//                 }

//                 // Find the user's cart
//                 const cart = await Cart.findOne({ user: req.user });

//                 // If the cart doesn't exist, create a new one
//                 if (!cart) {
//                     const newCart = new Cart({
//                         user: req.user,
//                         items: [{ product: productId, quantity }],
//                     });
//                     await newCart.save();
//                     return res.status(200).json(newCart);
//                 }

//                 // Check if the product is already in the cart
//                 const existingItem = cart.items.find((item) => item.product.toString() === productId);

//                 // If the product is already in the cart, update the quantity
//                 if (existingItem) {
//                     existingItem.quantity += quantity;
//                     await cart.save();
//                     return res.status(200).json(cart);
//                 }

//                 // If the product is not in the cart, add it
//                 cart.items.push({ product: productId, quantity });
//                 await cart.save();
//                 return res.status(200).json(cart);
//             });
//             break;
//         default:
//             res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }