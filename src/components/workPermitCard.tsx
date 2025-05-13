'use client';

import Image from 'next/image';

interface WorkPermitCardProps {
    fullName: string;
    permitNumber: string;
    issueDate: string;
    expiryDate: string;
    residenceNumber: string;
    nationality: string;
    gender: string;
    companyName: string;
    purpose: string;
    photoUrl: string;
}

export default function WorkPermitCard({
    fullName,
    permitNumber,
    issueDate,
    expiryDate,
    residenceNumber,
    nationality,
    gender,
    companyName,
    purpose,
    photoUrl
}: WorkPermitCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA-u-ca-islamic', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header with Saudi Logo and Vision 2030 */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="w-16 h-16 relative">
                    <Image
                        src="/saudi-logo.png"
                        alt="Saudi Arabia Logo"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="text-right">
                    <h2 className="text-sm font-bold text-gray-700">المملكة العربية السعودية</h2>
                    <p className="text-xs text-gray-500">وزارة الموارد البشرية والتنمية الاجتماعية</p>
                    <Image
                        src="/vision2030.png"
                        alt="Vision 2030"
                        width={80}
                        height={30}
                    />
                </div>
            </div>

            {/* Profile Section */}
            <div className="flex p-4 space-x-4 border-b">
                <div className="w-32 h-40 border-2 border-gray-300 rounded-lg overflow-hidden">
                    <Image
                        src={photoUrl}
                        alt={fullName}
                        width={128}
                        height={160}
                        objectFit="cover"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">اسم المُقيم</span>
                        <span className="text-sm text-gray-800">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">رقم التصريح</span>
                        <span className="text-sm text-gray-800">{permitNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">تاريخ الإصدار</span>
                        <span className="text-sm text-gray-800">{formatDate(issueDate)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">تاريخ الانتهاء</span>
                        <span className="text-sm text-gray-800">{formatDate(expiryDate)}</span>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-4 border-b">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">رقم الإقامة</span>
                        <span className="text-sm text-gray-800">{residenceNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">الجنسية</span>
                        <span className="text-sm text-gray-800">{nationality}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">الجنس</span>
                        <span className="text-sm text-gray-800">{gender === 'male' ? 'ذكر' : 'أنثى'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-600">اسم الشركة</span>
                        <span className="text-sm text-gray-800">{companyName}</span>
                    </div>
                </div>
            </div>

            {/* Footer with QR Code and Additional Details */}
            <div className="flex justify-between items-center p-4">
                <div className="w-24 h-24">
                    {/* <QRCodeSVG
                        value={`${fullName}|${permitNumber}|${issueDate}|${expiryDate}`}
                        size={96}
                    /> */}
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-600">{purpose}</p>
                    <p className="text-xs text-gray-500">تاريخ الطباعة: {new Date().toLocaleDateString('ar-SA')}</p>
                </div>
            </div>
        </div>
    );
}