import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // This tells Prisma where your schema is
  schema: "prisma/schema.prisma",
  datasource: {
    // This pulls your Docker DB URL from your .env file
    url: process.env.DATABASE_URL,
  },
});
