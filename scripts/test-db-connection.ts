import path from "node:path";
import { config as loadEnv } from "dotenv";
import mongoose from "mongoose";
import { connectToDatabase } from "../database/mongoose";

// Load environment variables from local env files before attempting to connect.
const envCandidates = [".env.local", ".env"];
for (const filename of envCandidates) {
    loadEnv({
        path: path.resolve(process.cwd(), filename),
        override: false,
    });
}

async function main() {
    try {
        await connectToDatabase();
        console.log("Database connection succeeded");
    } catch (error) {
        console.error("Database connection failed");
        console.error(error);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log("Connection closed");
        }
    }
}

main().catch((error) => {
    console.error("Unexpected error while testing database connection");
    console.error(error);
    process.exitCode = 1;
});
