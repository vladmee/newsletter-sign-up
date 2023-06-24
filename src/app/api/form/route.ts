import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return new NextResponse("What's your email?");
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body || (body && !body.email)) {
    return NextResponse.json({ error: 'Email not found' }, { status: 500 });
  }

  return NextResponse.json({ email: `${body.email}` });
}
