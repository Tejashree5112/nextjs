// import mongoose, { Schema, Document } from "mongoose";
// import { UserDocument } from "./user.model";
// import { ProductDocument } from "./product.model";

// export interface CartItem {
//     product: ProductDocument["_id"];
//     quantity: number;
// }

// export interface CartDocument extends Document {
//     user: UserDocument["_id"];
//     items: CartItem[];
//     createdAt: Date;
//     updatedAt: Date;
// }

// const CartSchema: Schema<CartDocument> = new Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true,
//         },
//         items: [
//             {
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "Product",
//                     required: true,
//                 },
//                 quantity: {
//                     type: Number,
//                     required: true,
//                     min: 1,
//                 },
//             },
//         ],
//     },
//     { timestamps: true }
// );

// export default mongoose.models.Cart || mongoose.model<CartDocument>("Cart", CartSchema);