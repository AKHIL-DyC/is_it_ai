import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, score } = await req.json();
  if (!name || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const saved = await prisma.userScore.create({
    data: { name, score },
  });

  return NextResponse.json(saved);
}