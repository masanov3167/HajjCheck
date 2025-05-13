'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import AddCertificateForm from '@/components/addCertificate';
import Header from '@/components/header';
import { useLocale, useTranslations } from 'next-intl';

export default function EditPage() {
  const t = useTranslations("edit");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [certificate, setCertificate] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState(id ?? "");
  const locale = useLocale();

  useEffect(() => {
    if (id) {
      fetchCertificate(id);
    }
  }, [id]);

  const fetchCertificate = async (id: string) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/');
        return;
      }

      const response = await fetch(`/api/certificates/${id}`);
      const data = await response.json();

      if (response.status === 401) {
        Cookies.remove("token");
        setError(t("error_unauthorized"));
        window.location.href = "/";
        return;
      }

      if (!response.ok) {
        setError(data?.error || t("error_fetch"));
        return;
      }

      setCertificate(data);
    } catch (error) {
      setError(t("error_server"));
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      setError("");
      setCertificate(null);
      router.push(`/edit?id=${searchId}`);
    }
  };

  const returnDefaultValue = () => {
    if (certificate) {
      const { createdAt, updatedAt, _id, __v, ...other } = certificate;
      return other;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      <div className="max-w-[1000px] w-full mx-auto mb-10">
        <h2 className="text-xl font-bold mb-4">{t("form_search_button")}</h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={t("form_search_placeholder")}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {t("form_search_button")}
          </button>
        </form>
      </div>

      {certificate && <AddCertificateForm data={returnDefaultValue()} locale={locale} />}
    </div>
  );
}
