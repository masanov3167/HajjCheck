'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";

const Header = () => {
    const t = useTranslations("header"); // Initialize the translation hook

    return (
        <div className="max-w-[1000px] w-full mx-auto py-4">
            <div className="flex justify-between items-center gap-6">
                <Link href="/" prefetch={true} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {t('home')}
                </Link>
                <Link href="/edit" prefetch={true} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                    {t('edit')}
                </Link>
            </div>
        </div>
    );
};

export default Header;
