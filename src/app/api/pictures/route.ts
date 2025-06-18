import { NextResponse } from "next/server";
import { PrismaClient } from '@/generated/prisma' 
const prisma = new PrismaClient();
export async function GET() {
  try {
    const pictures = await prisma.picture.findMany();
    return NextResponse.json(pictures);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pictures" }, { status: 500 });
  }
}
