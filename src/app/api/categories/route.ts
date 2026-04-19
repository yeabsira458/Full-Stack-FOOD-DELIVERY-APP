import { NextResponse } from "next/server";
import { menu } from "@/data";

export const GET = async () => {
  try {
    return NextResponse.json(menu, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
