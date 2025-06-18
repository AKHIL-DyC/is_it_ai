

import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma'
const prisma = new PrismaClient();
export async function GET() {
  try {
    const scores = await prisma.userScore.findMany({
      orderBy: { score: 'desc' }, 
    });
    return NextResponse.json(scores);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}
