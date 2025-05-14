import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    currentLanguage: 'en' | 'ar',
    isLoading: boolean,
    handleDownload: () => void,
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ currentLanguage, isLoading, handleDownload }) => {


    const buttonText = {
        en: isLoading ? 'Downloading... (10-15s)' : 'Download',
        ar: isLoading ? "جارٍ التنزيل ... (١٠-١٥ ث)" : "تحميل"
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isLoading}
            className={`fixed bottom-6 ${currentLanguage === 'ar' ? 'left-6' : 'right-6'}
            bg-[#1c2c40] hover:bg-[#45587d]
            text-white px-6 py-4 rounded-full shadow-xl
            transition-all duration-300 ease-in-out
            flex items-center gap-3 group
            border border-[#2d3f52]
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            <Download
                className={`w-5 h-5 ${currentLanguage === 'ar' ? 'order-2' : 'order-1'}
                transition-transform group-hover:scale-110`}
            />
            <span className={`text-sm font-medium ${currentLanguage === 'ar' ? 'order-1' : 'order-2'}`}>
                {buttonText[currentLanguage]}
            </span>
        </button>
    );
};

export default DownloadButton;
