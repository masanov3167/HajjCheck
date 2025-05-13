import { useLocale } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslations } from "use-intl";


type Props = {
    setSelectedLanguage: Dispatch<SetStateAction<string>>,
    selectedLanguage: string
}

const CertificateTabs = ({ selectedLanguage, setSelectedLanguage }: Props) => {
    const locale = useLocale();
    const t = useTranslations("certificate");
    return (
        <div className="flex mb-4 w-full justify-center">
            <button
                className={`px-4 py-2 text-white ${locale === "en" ? "rounded-l-lg" : "rounded-r-lg"} ${selectedLanguage === "en" ? "bg-blue-500" : "bg-gray-400"
                    }`}
                onClick={() => setSelectedLanguage("en")}
            >
                {t("tabs.inEnglish")}
            </button>
            <button
                className={`px-4 py-2 text-white ${locale !== "en" ? "rounded-l-lg" : "rounded-r-lg"} ${selectedLanguage === "ar" ? "bg-blue-500" : "bg-gray-400"
                    }`}
                onClick={() => setSelectedLanguage("ar")}
            >
                {t("tabs.inArabic")}
            </button>
        </div>
    )
}


export default CertificateTabs