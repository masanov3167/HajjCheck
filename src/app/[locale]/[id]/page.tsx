'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useWindowWidth from '@/hooks/useWindowWidth';
import { ICertificat } from '@/types/certificate';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

const Text = ({ name, info, upper }: { name: string, info?: string, upper?: boolean }) => {
  return (
    <div className='mt-3'>
      <span className='block text-[#999] font-[500] text-[14px] mb-[2px]'>{name}</span>
      <strong className={`block text-black font-bold text-[15px] ${upper ? "uppercase" : ""}`}>{info ?? "--"}</strong>
    </div>
  )
}

export default function CertificatePage() {
  const params = useParams();
  const [certificate, setCertificate] = useState<ICertificat | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const certificateRef = useRef<HTMLDivElement>(null);
  const width = useWindowWidth();
  const locale = useLocale();
  const t = useTranslations("single");
  const te = useTranslations("header")
  const isRTL = locale === "ar";

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/certificates/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
          return;
        }

        setCertificate(data);
      } catch (error) {
        setError('Server xatosi yuz berdi');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificate();
  }, [params.id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-red-600 text-center mb-4">{error}</div>
          <Link
            href="/"
            className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {te("home")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-0 m-0">
      <div className="w-full bg-[#1c2c40] h-[70px] flex justify-center items-center">
        <Image
          src="/images/header.PNG"
          alt='Ministry of Health of the Republic of Uzbekistan'
          width={180}
          height={50}
          className='w-[150px] h-[50px]'
        />
      </div>
      <div className='w-full grid grid-cols-2'>
        <Link href={`/en/${params.id}`} className={`text-center font-bold p-4 ${locale === "en" ? "bg-[#45587d] text-white" : ""}`}>English</Link>
        <Link href={`/${params.id}`} className={`text-center font-bold p-4 ${locale === "ar" ? "bg-[#45587d] text-white" : ""}`}>عربي</Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1c2c40]"></div>
        </div>
      ) : (
        <div className={`w-full max-w-[600px] mx-auto my-5 ${isRTL ? 'rtl' : 'ltr'}`} ref={certificateRef}>
          <Image
            className='mx-auto border-[2px] rounded-[10px] my-5'
            alt={certificate?.full_name ?? ""}
            width={150}
            height={100}
            src={certificate?.photo_url ?? ""}
          />

          <Text name={t("name")} info={certificate?.full_name} upper />
          <Text name={t("id")} info={certificate?.document_number} upper />
          <Text name={t("nationality")} info={certificate?.nationality} upper />
          <Text name={t("date_of_birth")} info={certificate?.birth_date} upper />
          <Text name={t("gender")} info={certificate?.gender} upper />
          <hr className='mt-3 border' />
          <Text name={t("permit_type")} info={certificate?.permit_type} upper />
          <Text name={t("permit_number")} info={certificate?.permit_number} upper />
          <hr className='mt-3 border' />
          <Text name={t("blood_type")} info={certificate?.blood_type} upper />
          <Text name={t("physical_disability")} info={certificate?.disability} upper />
          <Text name={t("chronic_diseases")} info={certificate?.chronic_diseases} upper />
          <Text name={t("smoking")} info={certificate?.smoking} upper />
          <hr className='mt-3 border' />
          <Text name={t("camp_number")} info={certificate?.camp_number} upper />
          <Text name={t("street_number")} info={certificate?.street_number} upper />
          <Text name={t("gate_number")} info={certificate?.gate_number} upper />
          <Text name={t("camp_capacity")} info={certificate?.camp_capacity} upper />
          <hr className='mt-3 border' />
          <Text name={t("service_provider")} info={certificate?.service_provider} upper />
          <Text name={t("company_number")} info={certificate?.company_number} upper />
          <Text name={t("service_group_in_mecca")} info={certificate?.service_group_in_mecca} upper />
          <Text name={t("service_group_contact_in_mecca")} info={certificate?.service_group_contact_in_mecca} upper />
          <hr className='mt-3 border' />
          <Text name={t("accommodation_name_in_mecca")} info={certificate?.accommodation_in_mecca} upper />
          <hr className='mt-3 border' />
          <Text name={t("accommodation_name_in_medina")} info={certificate?.accommodation_in_medina} upper />
        </div>
      )}
    </div>
  );
}