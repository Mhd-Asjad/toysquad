import mongoose from "mongoose"
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("please add the mongodb URI to .env.local")
}

let cached = global.mongoose || { conn: null , promise: null};

export async function connectDB(){
        if (cached.conn) return cached.conn
        
        if (!cached.conn) {

            // create new connection with mongo db
            cached.promise = mongoose
            .connect(MONGODB_URI,{
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            })
            .then((mongoose)=> {
                console.log("Mongo db is connected Now")
            return mongoose
        })
        .catch((error) => {
            console.error("❌ MongoDB connection error:", error);
            process.exit(1);
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}