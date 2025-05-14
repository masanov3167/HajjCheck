'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import QRCode from "qrcode";

interface QrCodeProps {
    link: string;
    size?: number;
    setGeneratedPdf: Dispatch<SetStateAction<boolean>>
}

const QrCode: React.FC<QrCodeProps> = ({ link, size = 200, setGeneratedPdf }) => {
    const [qrSrc, setQrSrc] = useState<string>("");

    useEffect(() => {
        if (link) {
            QRCode.toDataURL(link, { width: size, margin: 2 })
                .then((url) => {
                    setGeneratedPdf(true);
                    setQrSrc(url);
                })
                .catch((err) => console.log("QR Code error:", err));
        }
    }, [link, size]);



    return (
        <div className="w-[100px] h-[100px]">
            {qrSrc ? (
                <img src={qrSrc} alt="QR Code" className="w-auto h-auto" />
            ) : (
                <p>QR Code generatsiya qilinmoqda...</p>
            )}
        </div>
    );
};

export default QrCode