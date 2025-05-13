import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";


export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    return (
        <>
            <NextIntlClientProvider messages={messages}>
                {children}
            </NextIntlClientProvider>
        </>
    );
}