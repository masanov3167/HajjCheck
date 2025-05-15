import { ICertificat } from '@/types/certificate';
import mongoose from 'mongoose';


const certificateSchema = new mongoose.Schema<ICertificat>({
  number: {
    type: String,
    required: [true, 'رقم الشهادة مطلوب'],
    unique: true,
    trim: true
  },
  full_name: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    trim:true,
  },
  permit_type: {
    type: String,
    trim: true
  },
  organization: {
    type: String,
    trim: true,
    default: null
  },
  photo_url: {
    type: String,
    trim: true,
    default: null
  },
  document_number: {
    type: String,
    trim: true,
    default: null
  },
  birth_date: {
    type: String,
    default: null
  },
  blood_type: {
    type: String,
    default: null
  },
  disability: {
    type: String,
    default: null
  },
  chronic_diseases: {
    type: String,
    default: null
  },
  smoking: {
    type: String,
    default: null
  },
  camp_number: {
    type: String,
    default: null
  },
  street_number: {
    type: String,
    default: null
  },
  gate_number: {
    type: String,
    default: null
  },
  camp_capacity: {
    type: String,
    default: null
  },
  service_provider: {
    type: String,
    default: null
  },
  company_number: {
    type: String,
    default: null
  },
  service_group_in_mecca: {
    type: String,
    default: null
  },
  service_group_contact_in_mecca: {
    type: String,
    default: null
  },
  accommodation_in_mecca: {
    type: String,
    default: null
  },
  accommodation_in_medina: {
    type: String,
    default: null
  },
  issueDate: {
    type: String,
    default: null
  },
  expiryDate: {
    type: String,
    default: null
  },
  visaNumber: {
    type: String,
    default: null
  },
  purposeOfPermit: {
    type: String,
    default: null
  },
  printDate: {
    type: String,
    default: null
  },
  permit_number: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificat>('Certificate', certificateSchema);