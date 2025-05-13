import dbConnect from './db';
import Certificates from '@/models/certificates';
import { verifyToken } from './jwt';
import { ICertificat } from '@/types/certificate';

export async function getCertificates(token: string) {
  await dbConnect();
  const user = verifyToken(token);
  if (!user) {
    throw new Error('Yaroqsiz token');
  }
  return Certificates.find({}).sort({ createdAt: -1 });
}

export async function getCertificate(id: string) {
  await dbConnect();
  try {
    return await Certificates.findById(id);
  } catch {
    return null;
  }
}

export async function getCertificateByNumber(number: string) {
  await dbConnect();
  return Certificates.findOne({ number });
}

export async function createCertificate(data: Partial<ICertificat>, token: string) {
  await dbConnect();
  const user = verifyToken(token);
  if (!user) {
    throw new Error('Yaroqsiz token');
  }

  try {
    const certificate = new Certificates(data);    
    await certificate.validate();    
    return certificate.save();
    
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('Bu raqamli sertifikat allaqachon mavjud');
    }
    throw new Error(error.message || 'Sertifikat yaratishda xatolik yuz berdi');
  }
}

export async function updateCertificate(id: string, data: Partial<ICertificat>, token: string) {
  await dbConnect();
  const user = verifyToken(token);
  if (!user) {
    throw new Error('Yaroqsiz token');
  }

  try {
    const certificate = await Certificates.findOneAndUpdate(
      {number: id},
      { $set: data },
      { new: true, runValidators: true }
    );
    
    if (!certificate) {
      throw new Error('Sertifikat topilmadi');
    }
    
    return certificate;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error('Bu raqamli sertifikat allaqachon mavjud');
    }
    throw new Error(error.message || 'Sertifikatni yangilashda xatolik yuz berdi');
  }
}