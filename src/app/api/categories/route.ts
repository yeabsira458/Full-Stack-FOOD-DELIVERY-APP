import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import prismaConfig from "../../../../prisma.config";
import prisma from "@/lib/prisma";
// Adjust the path depending on exactly where your 'src' folder is
const prisma = new PrismaClient(prismaConfig);
// fetch all data
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching categories" }),
      { status: 500 },
    );
  }
  return new NextResponse("Hello!", { status: 200 });
};
export const POST = () => {
  return new NextResponse("Hello!", { status: 200 });
};
