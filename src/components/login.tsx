'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import { useLocale, useTranslations } from 'next-intl';

export default function LoginForm() {
  const t = useTranslations("login");
  const locale = useLocale();
  const [error, setError] = useState('');

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale

        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || t('loginError'));
        return;
      }

      Cookies.set('token', data.token);
      window.location.reload();
    } catch (error) {
      setError(t('serverError'));
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('login')}</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: Partial<{ email: string; password: string }> = {};
          if (!values.email) errors.email = t('requiredEmail');
          if (!values.password) errors.password = t('requiredPassword');
          return errors;
        }}
        onSubmit={handleLogin}
      >
        <Form className="space-y-4">
          <div>
            <Field
              type="email"
              name="email"
              placeholder={t('email')}
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              placeholder={t('password')}
              className="w-full p-2 border rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {t('submit')}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
