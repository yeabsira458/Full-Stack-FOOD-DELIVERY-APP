import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { menu, pizzas } from "../src/data";

const prisma = new PrismaClient();

async function main() {
  // Seed categories
  for (const category of menu) {
    await prisma.category.create({
      data: {
        title: category.title || "",
        desc: category.desc || "",
        color: category.color || "",
        img: category.img || "",
        slug: category.slug || "",
      },
    });
  }

  // Seed products
  for (const pizza of pizzas) {
    const category = menu.find((c) => c.slug === "pizzas"); // Assuming pizzas are under pizzas category
    if (category) {
      await prisma.product.create({
        data: {
          title: pizza.title || "",
          desc: pizza.desc || "",
          img: pizza.img || "",
          price: pizza.price || 0,
          options: pizza.options || [],
          catSlug: category.slug,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
