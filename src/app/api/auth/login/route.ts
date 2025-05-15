import { NextResponse } from 'next/server';
import { signToken } from '@/lib/jwt';

const getLanguage = (request: Request) => {
  const lang = request.headers.get('accept-language')?.split(',')[0]; // tilni header orqali olish
  return lang || 'ar'; // default tilni belgilash
};

export async function POST(request: Request) {
  const lang = getLanguage(request);
  
  const errors = {
    en: { error: 'Incorrect email or password' },
    ar: { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
  };
  
  try {
    const { email, password } = await request.json();
    
    if (email !== 'x_adm2025$@hajjcheck.io' || password !== 'Hajj!@2025#S3cUr3$Zx9&AdmN') {
      return NextResponse.json(
        { error: lang == "en" ? errors["en"].error : errors["ar"].error },
        { status: 401 }
      );
    }
    
    const token = signToken({ email });
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}