import { NextResponse } from 'next/server';
import { createCertificate, getCertificates } from '@/lib/certificates';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ICertificat } from '@/types/certificate';

const messages: Record<string, Record<string, { en: string; ar: string }>> = {
  error: {
    tokenNotFound: { en: "Token not found", ar: "لم يتم العثور على الرمز" },
    fileNotFound: { en: "Image not found", ar: "لم يتم العثور على الصورة" },
    serverError: { en: "Server error occurred", ar: "حدث خطأ في الخادم" },
    invalidToken: { en: "Invalid token", ar: "رمز غير صالح" },
    invalidNumber: { en: "Invalid certificate number, it is already used", ar: "رقم الشهادة غير صالح، تم استخدامه بالفعل" }
  }
};

function tt(key: string, locale: string): string {
  const keys = key.split('.');
  let result: any = messages;

  for (const k of keys) {
    result = result[k];
  }

  return result[locale] || result['ar']; 
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const locale = req.headers.get('Accept-Language') || 'ar';
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: tt('error.tokenNotFound', locale) }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const formData = await req.formData();

    let photo_url: string | undefined = undefined;

    const file = formData.get('photo_url') as File | null;

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'user_images');
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      photo_url = `/uploads/user_images/${fileName}`;
    }

    // FormData'dan qiymatlarni yechib olish va ICertificat interfeysiga moslashtirish
    const certificateData: ICertificat = {
      number: formData.get('number')?.toString() || '',
      full_name: formData.get('full_name')?.toString() || undefined,
      nationality: formData.get('nationality')?.toString() || undefined,
      gender: formData.get('gender')?.toString() as 'male' | 'female' || undefined,
      permit_type: formData.get('permit_type')?.toString() || undefined,
      organization: formData.get('organization')?.toString() || undefined,
      photo_url: photo_url ?? undefined,
      document_number: formData.get('document_number')?.toString() || undefined,
      birth_date: formData.get('birth_date')?.toString() || undefined,
      blood_type: formData.get('blood_type')?.toString() || undefined,
      disability: formData.get('disability')?.toString() || undefined,
      chronic_diseases: formData.get('chronic_diseases')?.toString() || undefined,
      smoking: formData.get('smoking')?.toString() || undefined,
      camp_number: formData.get('camp_number')?.toString() || undefined,
      street_number: formData.get('street_number')?.toString() || undefined,
      gate_number: formData.get('gate_number')?.toString() || undefined,
      camp_capacity: formData.get('camp_capacity')?.toString() || undefined,
      service_provider: formData.get('service_provider')?.toString() || undefined,
      company_number: formData.get('company_number')?.toString() || undefined,
      service_group_in_mecca: formData.get('service_group_in_mecca')?.toString() || undefined,
      service_group_contact_in_mecca: formData.get('service_group_contact_in_mecca')?.toString() || undefined,
      accommodation_in_mecca: formData.get('accommodation_in_mecca')?.toString() || undefined,
      accommodation_in_medina: formData.get('accommodation_in_medina')?.toString() || undefined,
      issueDate: formData.get('issueDate')?.toString() || undefined,
      expiryDate: formData.get('expiryDate')?.toString() || undefined,
      visaNumber: formData.get('visaNumber')?.toString() || undefined,
      purposeOfPermit: formData.get('purposeOfPermit')?.toString() || undefined,
      printDate: formData.get('printDate')?.toString() || undefined,
      permit_number: formData.get('permit_number')?.toString() || undefined,
    };

    const certificate = await createCertificate(certificateData, token);

    return NextResponse.json(certificate);
  } catch (error: any) {
    if (error?.code == 11000) {
      return NextResponse.json(
        { error: tt('error.invalidNumber', locale) },
        { status: 500 }
      );
    }
    
    const statusCode = error.message === tt('error.tokenNotFound', locale) ? 401 : 500;
    return NextResponse.json(
      { error: tt('error.serverError', locale) },
      { status: statusCode }
    );
  }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const locale = request.headers.get('Accept-Language') || 'ar';
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: tt('error.tokenNotFound', locale) },
      { status: 401 }
    );
  } 

  const token = authHeader.split(' ')[1];

  try {
    const certificates = await getCertificates(token);
    return NextResponse.json(certificates);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || tt('error.serverError', locale) },
      { status: error.message === tt('error.invalidToken', locale) ? 401 : 500 }
    );
  }
}

