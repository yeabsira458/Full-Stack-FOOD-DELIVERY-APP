const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:mypassword@localhost:5432/postgres" } } });

async function main() {
  try {
    const category = await prisma.category.create({
      data: {
        title: "Test Category " + Math.floor(Math.random() * 1000),
        desc: "This row was added successfully!",
        color: "blue",
        img: "/temporary.png",
        slug: "test-slug-" + Date.now(),
      },
    });
    console.log("SUCCESSFULLY INSERTED NEW ROW INTO DATABASE: ", category.slug);
  } catch (error) {
    console.error("ERROR INSERTING ROW:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
