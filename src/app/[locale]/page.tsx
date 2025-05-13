'use client';

import { Fragment, Suspense, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LoginForm from '@/components/login';
import AddCertificateForm from '@/components/addCertificate';
import Header from '@/components/header';
import { useLocale } from 'next-intl';



export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const locale = useLocale();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {
        !loading && (
          <Fragment>
            {
              isLoggedIn ? (
                <div className='w-full flex flex-col items-center'>
                  <Header />
                  <AddCertificateForm locale={locale} />
                </div>
              ) : <LoginForm />
            }
          </Fragment>
        )

      }
    </div>
  );
}