export interface ICertificate {
  permit_number: string;
  full_name: string;
  issue_date: string;
  expiry_date: string;
  residence_number: string;
  nationality: string;
  gender: 'male' | 'female';
  company_name: string;
  purpose: string;
  description: string;
  number: string;
  photo_url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICertificat {
    number: string;                
    full_name?: string;           
    nationality?: string;         
    gender?: 'male' | 'female';   
    permit_type?: string;         
    organization?: string;       
    photo_url?: string;
    document_number?: string;
    birth_date?: string;   
    blood_type?: string;
    disability?: string;
    chronic_diseases?: string;
    smoking?: string;
    camp_number?: string;
    street_number?: string;
    gate_number?: string;
    camp_capacity?: string;
    service_provider?: string;
    company_number?: string;
    service_group_in_mecca?: string;
    service_group_contact_in_mecca?: string;
    accommodation_in_mecca?: string;
    accommodation_in_medina?: string;
    issueDate?: string;           
    expiryDate?: string;          
    visaNumber?: string;          
    purposeOfPermit?: string;     
    printDate?: string;      
    permit_number?: string    
}
