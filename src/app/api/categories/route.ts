import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
