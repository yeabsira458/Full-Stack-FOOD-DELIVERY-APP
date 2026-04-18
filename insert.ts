import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

async function insertTest() {
  try {
     console.log("Attempting to insert a brand new row into PostgreSQL...");
     const newCategory = await prisma.category.create({
       data: {
          title: "Burgers " + Math.floor(Math.random() * 1000),
          desc: "Fresh tasty burgers",
          color: "red",
          img: "/temporary.png",
          slug: "burgers-test-" + Date.now()
       }
     });
     console.log("✅ SUCCESS! The database happily accepted the new row!");
     console.log("Newly inserted data:", newCategory);
  } catch (e) {
     console.error("❌ Failed to insert row!", e);
  } finally {
     await prisma.$disconnect();
  }
}

insertTest();
