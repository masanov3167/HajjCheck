import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    const token = await login(email, password);
    if (!token) {
      return NextResponse.json(
        { error: 'Noto\'g\'ri email yoki parol' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Server xatosi yuz berdi' },
      { status: 500 }
    );
  }
}