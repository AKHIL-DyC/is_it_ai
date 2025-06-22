import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, score,email } = await req.json();
  if (!name || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const saved = await prisma.userScore.create({
    data: { name, score ,email},
  });

  return NextResponse.json(saved);
}