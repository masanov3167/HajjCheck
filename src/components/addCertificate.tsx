'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ICertificat } from '@/types/certificate';



type FormInputProps = {
    colSpan?: number,
    label: string,
    fieldType?: string,
    fieldName: string,
    rtl?: boolean
}

const FormInput = ({ colSpan, fieldName, label, fieldType, rtl }: FormInputProps) => {
    return (
        <div className={colSpan ? "col-span-2" : "col-span-2 md:col-span-1"}>
            <label className={`block text-sm font-bold text-gray-700 ${rtl ? 'text-right' : ''}`}>{label}</label>
            <Field
                type={fieldType ?? "text"}
                name={fieldName}
                className={`mt-1 block w-full rounded-md border px-2 py-1 ${rtl ? 'text-right' : ''}`}
                dir={rtl ? 'rtl' : 'ltr'}
            />
        </div>
    );
};

const CertificateImg = ({
    imagePreview,
    setImagePreview,
    setFieldValue
}: {
    imagePreview: string | null,
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
    return (
        <div className="w-full my-5 col-span-2 flex justify-center">
            <div className="w-36 h-36 border bg-gray-100 rounded-lg">
                <div className="flex justify-center mb-4 w-full h-full">
                    <label htmlFor="image-input" className="cursor-pointer w-full h-full">
                        <div className="w-full h-full relative flex justify-center items-center">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    className="w-full h-full rounded-lg object-cover"
                                    alt="Preview"
                                />
                            ) : (
                                <div className="w-3/4 h-3/4 flex justify-center items-center text-gray-400">
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.25 6C7.25 3.37665 9.37665 1.25 12 1.25C14.6234 1.25 16.75 3.37665 16.75 6C16.75 8.62335 14.6234 10.75 12 10.75C9.37665 10.75 7.25 8.62335 7.25 6ZM8.8 13.25C5.73482 13.25 3.25 15.7348 3.25 18.8C3.25 20.9815 5.01848 22.75 7.2 22.75H16.8C18.9815 22.75 20.75 20.9815 20.75 18.8C20.75 15.7348 18.2652 13.25 15.2 13.25H8.8Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            )}
                            <div className="w-8 h-8 absolute right-2 bottom-2 text-gray-500 p-1 bg-white flex justify-center items-center rounded-lg shadow">
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.1371 13.2241C14.7769 13.1049 14.3973 13.0279 14.0026 12.9992C12.6378 12.8997 11.3658 12.8998 9.99843 12.9997C7.60511 13.1745 5.76638 15.12 5.42358 17.5007L5.35799 17.9562C5.1602 19.3298 6.11389 20.6112 7.49065 20.7584C8.54973 20.8716 10.0131 20.9619 11.0887 21.0047M14.1069 18.4885L13.9956 20.3085C13.9883 20.4284 14.0876 20.5277 14.2075 20.5203L16.0274 20.4091C16.0578 20.4072 16.0865 20.3943 16.108 20.3728L19.5336 16.9472C20.0761 16.4047 20.0761 15.525 19.5336 14.9824C18.991 14.4398 18.1113 14.4398 17.5687 14.9824L14.1432 18.408C14.1217 18.4295 14.1087 18.4581 14.1069 18.4885ZM15.4994 6.5C15.4994 8.433 13.9324 10 11.9994 10C10.0664 10 8.49939 8.433 8.49939 6.5C8.49939 4.567 10.0664 3 11.9994 3C13.9324 3 15.4994 4.567 15.4994 6.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <input
                    type="file"
                    id="image-input"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const url = URL.createObjectURL(file);
                            setImagePreview(url);
                            setFieldValue('photo_url', file);
                        }
                    }}
                />
            </div>
        </div>
    );
};

type FormProps = {
    data?: ICertificat;
    locale: string;
};

export default function AddCertificateForm({ data, locale }: FormProps) {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const t = useTranslations('certificate');
    const isRtl = locale === 'ar';
    const [imagePreview, setImagePreview] = useState<string | null>(
        data?.photo_url && typeof data.photo_url === 'string' ? data.photo_url : null
    );

    const handleSubmit = async (values: ICertificat) => {
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();

            if (values?.photo_url) {
                formData.append('photo_url', values.photo_url);
            }

            Object.entries(values).forEach(([key, value]) => {
                if (key !== 'photo_url' && value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            const token = Cookies.get('token');
            const response = await fetch(`/api/certificates${data?.number ? `/${data.number}` : ""}`, {
                method: data?.number ? "PUT" : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept-Language': locale
                },
                body: formData,
            });

            if (response.status === 401) {
                Cookies.remove("token");
                window.location.reload();
                return;
            }

            const res = await response.json();

            if (!response.ok) {
                setError(res.error);
                return;
            }

            router.push(`/${res.number}`);

        } catch (error) {
            setError(t('serverError'));
        } finally {
            setLoading(false);
        }
    };

    // Initialize form values
    const initialValues: ICertificat = {
        number: data?.number || '',
        full_name: data?.full_name || '',
        nationality: data?.nationality || '',
        gender: data?.gender || 'male',
        permit_type: data?.permit_type || '',
        organization: data?.organization || '',
        photo_url: data?.photo_url || undefined,
        document_number: data?.document_number || '',
        birth_date: data?.birth_date || '',
        blood_type: data?.blood_type || '',
        disability: data?.disability || '',
        chronic_diseases: data?.chronic_diseases || '',
        smoking: data?.smoking || '',
        camp_number: data?.camp_number || '',
        street_number: data?.street_number || '',
        gate_number: data?.gate_number || '',
        camp_capacity: data?.camp_capacity || '',
        service_provider: data?.service_provider || '',
        company_number: data?.company_number || '',
        service_group_in_mecca: data?.service_group_in_mecca || '',
        service_group_contact_in_mecca: data?.service_group_contact_in_mecca || '',
        accommodation_in_mecca: data?.accommodation_in_mecca || '',
        accommodation_in_medina: data?.accommodation_in_medina || '',
        issueDate: data?.issueDate || '',
        expiryDate: data?.expiryDate || '',
        visaNumber: data?.visaNumber || '',
        purposeOfPermit: data?.purposeOfPermit || '',
        printDate: data?.printDate || ''
    };

    // Simple validation function (only number is required)
    const validate = (values: ICertificat) => {
        const errors: Record<string, string> = {};
        if (!values.number) {
            errors.number = t('requiredField');
        }
        return errors;
    };

    return (
        <div className="max-w-[1000px] mx-auto w-full bg-white rounded-lg shadow-md px-2 md:px-8 py-4 md:py-8" dir={isRtl ? 'rtl' : 'ltr'}>
            <h1 className="text-2xl font-bold mb-6 text-center">{data ? t('editCertificate') : t('newCertificate')}</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="space-y-2 md:space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                            <CertificateImg
                                setFieldValue={setFieldValue}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                            />

                            <FormInput colSpan={2} label={t('certificateId')} fieldName='number' rtl={isRtl} />
                            <FormInput label={t('fullName')} fieldName='full_name' rtl={isRtl} />
                            <FormInput label={t('idNumber')} fieldName='document_number' rtl={isRtl} />
                            <FormInput label={t('nationality')} fieldName='nationality' rtl={isRtl} />
                            <FormInput label={t('birthDate')} fieldName='birth_date' rtl={isRtl} />

                            <div className="col-span-2 md:col-span-1">
                                <label className={`block text-sm font-bold text-gray-700 ${isRtl ? 'text-right' : ''}`}>
                                    {t('gender')}
                                </label>
                                <Field
                                    as="select"
                                    name="gender"
                                    className={`mt-1 block w-full rounded-md border px-2 py-1 ${isRtl ? 'text-right' : ''}`}
                                    dir={isRtl ? 'rtl' : 'ltr'}
                                >
                                    <option value="male">{t('male')}</option>
                                    <option value="female">{t('female')}</option>
                                </Field>
                            </div>

                            <FormInput label={t('permitType')} fieldName='permit_type' rtl={isRtl} />
                            <FormInput label={t('permitNumber')} fieldName='permit_number' rtl={isRtl} />
                            <FormInput label={t('organization')} fieldName='organization' rtl={isRtl} />
                            <FormInput label={t('bloodType')} fieldName='blood_type' rtl={isRtl} />
                            <FormInput label={t('disability')} fieldName='disability' rtl={isRtl} />
                            <FormInput label={t('chronicDiseases')} fieldName='chronic_diseases' rtl={isRtl} />
                            <FormInput label={t('smoking')} fieldName='smoking' rtl={isRtl} />
                            <FormInput label={t('campNumber')} fieldName='camp_number' rtl={isRtl} />
                            <FormInput label={t('streetNumber')} fieldName='street_number' rtl={isRtl} />
                            <FormInput label={t('gateNumber')} fieldName='gate_number' rtl={isRtl} />
                            <FormInput label={t('campCapacity')} fieldName='camp_capacity' rtl={isRtl} />
                            <FormInput label={t('serviceProvider')} fieldName='service_provider' rtl={isRtl} />
                            <FormInput label={t('companyNumber')} fieldName='company_number' rtl={isRtl} />
                            <FormInput label={t('serviceGroupInMecca')} fieldName='service_group_in_mecca' rtl={isRtl} />
                            <FormInput label={t('serviceGroupContactInMecca')} fieldName='service_group_contact_in_mecca' rtl={isRtl} />
                            <FormInput label={t('accommodationInMecca')} fieldName='accommodation_in_mecca' rtl={isRtl} />
                            <FormInput label={t('accommodationInMedina')} fieldName='accommodation_in_medina' rtl={isRtl} />
                            <FormInput label={t('issueDate')} fieldName='issueDate' rtl={isRtl} />
                            <FormInput label={t('expiryDate')} fieldName='expiryDate' rtl={isRtl} />
                            <FormInput label={t('visaNumber')} fieldName='visaNumber' rtl={isRtl} />
                            <FormInput label={t('purposeOfPermit')} fieldName='purposeOfPermit' rtl={isRtl} />
                            <FormInput label={t('printDate')} fieldName='printDate' rtl={isRtl} />
                        </div>

                        <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'} mt-6`}>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                                disabled={loading}
                            >
                                {loading ? t('saving') : t('save')}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}