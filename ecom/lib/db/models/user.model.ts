import { Document, Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;