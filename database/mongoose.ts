import fs from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import mongoose from "mongoose";

// Ensure environment variables are available even when this module is imported first.
const envFiles = [".env.local", ".env"];
for (const filename of envFiles) {
    const envPath = path.resolve(process.cwd(), filename);
    if (fs.existsSync(envPath)) {
        loadEnv({ path: envPath, override: false });
        break;
    }
}

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (!MONGODB_URI) throw new Error("MongoDB URI must be set within .env.local");

    if(cached.conn) return cached.conn;

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false});
    };

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    console.log(`Connected to database (${process.env.NODE_ENV || 'development'})`);
}