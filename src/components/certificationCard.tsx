'use client';

import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { ICertificate } from '@/types/certificate';
import QrCode from './qrcode';
import Image from 'next/image';

// Helper function to format sex display
const formatSex = (sex: string): string => {
    const lowerSex = sex.toLowerCase();
    if (lowerSex === 'male') {
        return 'Erkak / Male';
    } else if (lowerSex === 'female') {
        return 'Ayol / Female';
    }
    return '';
};

// Text component
const Text = ({ txt }: { txt: string }) => (
    <h3 className="text-[18px] leading-[38px] italic truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {txt}
    </h3>
);

const VaccinationCard: React.FC<{
    data: ICertificate,
    certificateRef: RefObject<HTMLDivElement>,
    setIsImgLoading: Dispatch<SetStateAction<boolean>>,
    loading: boolean,
    setGeneratedPdf: Dispatch<SetStateAction<boolean>>
}> = ({ data, certificateRef, setIsImgLoading, loading, setGeneratedPdf }) => {
    return (
        <div className="doc__font w-[794px] h-[1123px] mx-auto my-0 shadow-lg absolute -left-[2000px]" ref={certificateRef}>
            {/* ✅ Next.js Image Component */}
            <Image
                src="/images/background.svg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority
                quality={100}
                onLoadingComplete={() => {
                    setIsImgLoading(false);
                }}
            />

            {/* Rasm yuklanmaguncha UI ko'rinmaydi */}
            {(!loading) && (
                <div className="absolute top-[176px] left-[70px] right-[70px] bg-white bg-opacity-0">
                    <h2 className="text-xl font-bold">ID: {data.number}</h2>
                    <Text txt={`company: ${data.company_name}`} />
                    <Text txt={`full name: ${data.full_name}`} />
                    <Text txt={`nationality: ${data.nationality}`} />
                    <Text txt={`Jinsi / Sex: ${formatSex(data.gender)}`} />

                    {/* QR Kod */}
                    <div className="flex justify-center pt-[21px] pb-5">
                        <QrCode setGeneratedPdf={setGeneratedPdf} link={`${process.env.NEXT_PUBLIC_DOMEN!}/${data.number}`} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VaccinationCard;