import { NextResponse } from 'next/server';
import { getCertificate, updateCertificate, getCertificateByNumber } from '@/lib/certificates';
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
    invalidNumber: { en: "Invalid certificate number, it is already used", ar: "رقم الشهادة غير صالح، تم استخدامه بالفعل" },
    certificateNotFound: {en: "Certificate not found",   ar: "لم يتم العثور على الشهادة"}
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const locale = request.headers.get('Accept-Language') || 'ar';
  try {
    let certificate = await getCertificate(params.id);
    
    if (!certificate) {
      certificate = await getCertificateByNumber(params.id);
    }
    
    if (!certificate) {
      return NextResponse.json(
        { error: tt("error.certificateNotFound", locale) },
        { status: 404 }
      );
    }
    
    return NextResponse.json(certificate);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || tt("error.serverError", locale) },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get('authorization');
  const locale = request.headers.get('Accept-Language') || 'ar';
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: tt('error.tokenNotFound', locale) }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  let certificate = await getCertificate(params.id);
    
  if (!certificate) {
    certificate = await getCertificateByNumber(params.id);
  }
  
  if (!certificate) {
    return NextResponse.json(
      { error: tt("error.certificateNotFound", locale) },
      { status: 404 }
    );
  }

  try {    
    const formData = await request.formData();

    // FormData'dan qiymatlarni yechib olish va ICertificat interfeysiga moslashtirish
    const certificateData: Partial<ICertificat> = {
      number: formData.get('number')?.toString() || certificate.number,
      full_name: formData.get('full_name')?.toString() || certificate.full_name,
      nationality: formData.get('nationality')?.toString() || certificate.nationality,
      gender: formData.get('gender')?.toString() as 'male' | 'female' || certificate.gender,
      permit_type: formData.get('permit_type')?.toString() || certificate.permit_type,
      organization: formData.get('organization')?.toString() || certificate.organization,
      document_number: formData.get('document_number')?.toString() || certificate.document_number,
      birth_date: formData.get('birth_date')?.toString() || certificate.birth_date,
      blood_type: formData.get('blood_type')?.toString() || certificate.blood_type,
      disability: formData.get('disability')?.toString() || certificate.disability,
      chronic_diseases: formData.get('chronic_diseases')?.toString() || certificate.chronic_diseases,
      smoking: formData.get('smoking')?.toString() || certificate.smoking,
      camp_number: formData.get('camp_number')?.toString() || certificate.camp_number,
      street_number: formData.get('street_number')?.toString() || certificate.street_number,
      gate_number: formData.get('gate_number')?.toString() || certificate.gate_number,
      camp_capacity: formData.get('camp_capacity')?.toString() || certificate.camp_capacity,
      service_provider: formData.get('service_provider')?.toString() || certificate.service_provider,
      company_number: formData.get('company_number')?.toString() || certificate.company_number,
      service_group_in_mecca: formData.get('service_group_in_mecca')?.toString() || certificate.service_group_in_mecca,
      service_group_contact_in_mecca: formData.get('service_group_contact_in_mecca')?.toString() || certificate.service_group_contact_in_mecca,
      accommodation_in_mecca: formData.get('accommodation_in_mecca')?.toString() || certificate.accommodation_in_mecca,
      accommodation_in_medina: formData.get('accommodation_in_medina')?.toString() || certificate.accommodation_in_medina,
      issueDate: formData.get('issueDate')?.toString() || certificate.issueDate,
      expiryDate: formData.get('expiryDate')?.toString() || certificate.expiryDate,
      visaNumber: formData.get('visaNumber')?.toString() || certificate.visaNumber,
      purposeOfPermit: formData.get('purposeOfPermit')?.toString() || certificate.purposeOfPermit,
      printDate: formData.get('printDate')?.toString() || certificate.printDate,
      permit_number: formData.get('permit_number')?.toString() || undefined,
    };

    const file = formData.get('photo_url') as File;

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'user_images');
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      certificateData.photo_url = `/uploads/user_images/${fileName}`;
    }
    console.log(certificateData);
    

    // Ma'lumotlarni yangilash
    const updatedCertificate = await updateCertificate(params.id, certificateData, token);
    return NextResponse.json(updatedCertificate);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || tt("error.serverError", locale) },
      { status: error.message === tt("error.invalidToken", locale) ? 401 : 500 }
    );
  }
}