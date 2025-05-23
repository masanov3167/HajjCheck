'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ICertificat } from '@/types/certificate';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import DownloadButton from '@/components/downloadButton';
import SaudiPermitCard from '@/components/workPermitCard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Text = ({ name, info, upper }: { name: string, info?: string, upper?: boolean }) => {
  const locale = useLocale();
  return (
    <div className='mt-3' dir={locale == "ar" ? "rtl" : "ltr"}>
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
  const locale = useLocale();
  const t = useTranslations("single");
  const tc = useTranslations("certificate");
  const te = useTranslations("header")
  const isRTL = locale === "ar";
  const [generatedPdf, setGeneratedPdf] = useState<boolean>(false);
  const [pdfLoading, setPdfLoading] = useState<boolean>(false)

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

  const onDownload = async () => {
    try {
      if (!certificateRef.current) return;
      setPdfLoading(true);

      // CSS optimallashtirilgan klonni yaratish
      const clonedCert = certificateRef.current.cloneNode(true) as HTMLDivElement;
      clonedCert.style.display = 'block';
      clonedCert.style.position = 'absolute';
      clonedCert.style.left = '-9999px';
      clonedCert.style.top = '0';
      document.body.appendChild(clonedCert);

      // PDF konfiguratsiyalari
      const options = {
        scale: 3, // qalinlik (quality)
        useCORS: true,
        logging: false,
        allowTaint: true,
        letterRendering: true,
        foreignObjectRendering: false, // Yaxshiroq matn renderingi uchun
      };

      // Renderingdan oldin biroz kutish - stillar to'liq qo'llanishi uchun
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clonedCert, options);

      // PDF hajmi va sifatini optimallash
      const imgWidth = 210; // A4 enini mm da
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png', 1.0);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Tasreeh ${certificate?.full_name ?? 1}.pdf`);

      // Klonlangan elementni o'chirish
      document.body.removeChild(clonedCert);
      setPdfLoading(false);
    } catch (error) {
      console.error('PDF yaratishda xatolik:', error);
      setError('someting error');
      setPdfLoading(false);
    }
  };

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
        <div className={`w-full max-w-[600px] px-3 mx-auto mt-5 mb-24 ${isRTL ? 'rtl' : 'ltr'}`}>
          <Image
            className='mx-auto border-[2px] rounded-[10px] my-5'
            alt={certificate?.full_name ?? ""}
            width={150}
            height={100}
            src={certificate?.photo_url ? `https://absheerchecktasreeh.com${certificate?.photo_url}` : ""}
          />

          <Text name={t("permit_number")} info={certificate?.permit_number} upper />
          <Text name={t("name")} info={certificate?.full_name} upper />
          <Text name={tc("issueDate")} info={certificate?.issueDate} upper />
          <Text name={tc("expiryDate")} info={certificate?.expiryDate} upper />
          <Text name={t("id")} info={certificate?.document_number} upper />
          <Text name={t("nationality")} info={certificate?.nationality} upper />
          <Text name={t("gender")} info={certificate?.gender} upper />
          <Text name={t("company_number")} info={certificate?.company_number} upper />
          <Text name={t("permit_type")} info={certificate?.permit_type} upper />
          <Text name={tc("purposeOfPermit")} info={certificate?.purposeOfPermit} upper />
          <Text name={t("date_of_birth")} info={certificate?.birth_date} upper />
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
          <Text name={t("service_group_in_mecca")} info={certificate?.service_group_in_mecca} upper />
          <Text name={t("service_group_contact_in_mecca")} info={certificate?.service_group_contact_in_mecca} upper />
          <Text name={t("accommodation_name_in_mecca")} info={certificate?.accommodation_in_mecca} upper />
          <Text name={t("accommodation_name_in_medina")} info={certificate?.accommodation_in_medina} upper />

          <DownloadButton currentLanguage={locale as any} isLoading={pdfLoading} handleDownload={onDownload} />
        </div>
      )}

      {
        certificate && (
          <SaudiPermitCard certificateRef={certificateRef} data={certificate} setGeneratedPdf={setGeneratedPdf} />
        )
      }
    </div>
  );
}