// import mongoose from "mongoose";

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// const globalWithMongoose = global as typeof global & { mongoose: MongooseCache };

// const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

// export const connectToDatabase = async (
//   MONGODB_URI = process.env.MONGODB_URI
// ) => {
//   if (cached.conn) return cached.conn;
//   if (!MONGODB_URI) throw new Error('Mongodb is missing');
//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI);
//   cached.conn = await cached.promise;
//   return cached.conn;
// };


import mongoose from "mongoose";

const MONGODB_URI =  `mongodb://localhost:27017/EcomDB`;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "EcomDB" });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};