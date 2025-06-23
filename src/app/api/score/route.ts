import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, score,email,token} = await req.json();
  const cookieToken = req.cookies.get('quiz_token')?.value;


  if (!token || token !== cookieToken) {
    return NextResponse.json({ error: 'Unauthorized submission' }, { status: 403 });
  }

  if (!name || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
  if (score < 0 || score > 2650) {
    return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
}
if (!email.includes('@') || name.length < 3) {
   return NextResponse.json({ error: 'fake email' }, { status: 400 });
}
  const saved = await prisma.userScore.create({
    data: { name, score ,email},
  });

  return NextResponse.json(saved);
}