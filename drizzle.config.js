import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { resolve } from "path";

// ✅ Load the env file
dotenv.config({ path: resolve(__dirname, ".env.local") });

console.log("Loaded DATABASE_URL:", process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);

export default defineConfig({
  schema: "./configs/schema.jsx", // update if needed
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // ✅ FIX HERE: Use `url` instead of `connectionString`
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
});
