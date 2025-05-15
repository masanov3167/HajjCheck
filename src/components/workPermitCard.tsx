import { Dispatch, RefObject, SetStateAction } from 'react';
import QrCode from './qrcode';
import { ICertificat } from '@/types/certificate';

type Props = {
    data: ICertificat,
    setGeneratedPdf: Dispatch<SetStateAction<boolean>>,
    certificateRef: RefObject<HTMLDivElement>,
}

export default function SaudiPermitCard({ data, setGeneratedPdf, certificateRef }: Props) {
    return (
        <div className="w-[794px] h-[1123px] border mx-auto bg-white p-16 mb-5 absolute  -left-[2000px]" ref={certificateRef}>
            <div className='border border-gray-400'>
                <div className="flex justify-between items-center px-1 border-b border-gray-400">
                    <div className="w-1/4">
                        <img
                            src={data.photo_url}
                            alt="Person Photo"
                            className="border border-gray-400 h-[160px] w-32"
                        />
                    </div>

                    <div className="w-1/2 flex p-2 flex-col items-center">
                        <img
                            src="/images/center1.PNG"
                            alt="Saudi Logo"
                            className="h-[100px] w-[100px]"
                        />
                        <img
                            src="/images/center2.PNG"
                            alt="Saudi Logo"
                            className="w-[230px]"
                        />
                    </div>

                    <div className="w-1/4 flex py-2 flex-col items-center justify-center gap-1">
                        <img
                            src="/images/right1.PNG"
                            alt="Saudi Logo"
                            className="w-[200px] mx-auto"
                            style={{ width: "135px" }}
                        />
                        <img
                            src="/images/right2.PNG"
                            alt="Saudi Logo"
                            className="w-[110px]"
                        />
                    </div>
                </div>

                {/* Permit Number Row */}
                <div className="flex border-b border-gray-400">
                    <div className="w-3/4 h-14 flex justify-center  border-r border-gray-400">
                        <p className="text-sm font-[500] pt-2">{data?.permit_number ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex justify-center pt-2">
                        <p className="text-sm  text-gray-700">رقم التصريح</p>
                    </div>
                </div>
                {/* Name Row */}
                <div className="flex border-b border-gray-400">
                    <div className="w-3/4 h-14 flex justify-center  border-r border-gray-400">
                        <p className="text-sm font-[500] pt-2">{data?.full_name ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex justify-center pt-2">
                        <p className="text-sm  text-gray-700">اسم المقيم</p>
                    </div>
                </div>


                {/* Dates Row */}
                <div className="flex border-b border-gray-400">
                    <div className="w-1/4 h-14 flex  justify-center  border-r border-gray-400">
                        <p className="text-sm  pt-2">{data?.expiryDate ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex  justify-center  border-r border-gray-400">
                        <p className="text-sm pt-2 text-gray-700">تاريخ انتهاء التصريح</p>
                    </div>
                    <div className="w-1/4 h-14 flex  justify-center  border-r border-gray-400">
                        <p className="text-sm pt-2">{data?.issueDate ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex  justify-center">
                        <p className="text-sm pt-2 text-gray-700">تاريخ إصدار التصريح</p>
                    </div>
                </div>

                {/* ID Number Row */}
                <div className="flex border-b border-gray-400">
                    <div className="w-3/4 border-r border-gray-400 h-14 flex  justify-center">
                        <p className="text-sm pt-2">{data?.document_number ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex  justify-center">
                        <p className="text-sm text-gray-700 pt-2">رقم الإقامة/الحدود</p>
                    </div>
                </div>

                {/* Nationality Row */}
                <div className="flex border-b border-gray-400">
                    <div className="w-3/4 h-14 border-r border-gray-400  flex justify-center">
                        <p className="text-sm pt-2">{data?.nationality ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 text-right flex justify-center">
                        <p className="text-sm  text-gray-700 pt-2">الجنسية</p>
                    </div>
                </div>

                {/* Gender Row */}
                <div className="flex border-b border-gray-400">
                    <div className="w-3/4 h-14 border-r border-gray-400 flex justify-center">
                        <p className="text-sm pt-2">{data?.gender ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex justify-center">
                        <p className="text-sm text-gray-700 pt-2">الجنس</p>
                    </div>
                </div>

                {/* Company Name Row */}
                <div className="flex">
                    <div className="w-3/4 h-14 border-r border-gray-400 flex justify-center">
                        <p className="text-sm pt-2">{data?.company_number ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 text-right flex justify-center">
                        <p className="text-sm text-gray-700 pt-2">اسم الشركة/المؤسسة</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 border border-gray-400">
                {/* Permit Status Row */}
                <div className="flex">
                    <div className="w-3/4 h-[100px] border-r border-gray-400 flex justify-center">
                        <p className="text-sm">{data?.permit_type ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-[100px] flex items-center justify-center">
                        <p className="text-sm text-gray-700 -mt-5">غرض التصريح</p>
                    </div>
                </div>
                <div className="flex border-b border-gray-400">
                    <div className="w-3/4 h-14 border-r border-gray-400 flex justify-center">
                        <p className="text-sm pt-2">{data?.purposeOfPermit ?? "--"}</p>
                    </div>
                    <div className="w-1/4 h-14 flex justify-center">
                        <p className="text-sm text-gray-700 pt-2">وصف غرض التصريح</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 border border-gray-400">
                {/* Instructions Section */}
                <div className="p-2 ">
                    <div className="flex">
                        <div className="w-[100px] flex justify-center items-center">
                            <QrCode setGeneratedPdf={setGeneratedPdf} link={`${process.env.NEXT_PUBLIC_DOMEN!}/${data.number}`} />
                        </div>
                        <div className="w-[calc(100%-100px)]">
                            <p className="text-sm text-gray-700 text-right">تعليمات:</p>
                            <ol className="text-xs text-right font-[500] custom-list" dir="rtl">
                                <li className="mt-1">
                                    <span className="mr-1">1.</span>
                                    يجب إحضار صورة المقيم 4×6 (في حال عدم وجودها آلياً) وضع ختم المنشأة عليها.
                                </li>
                                <li className="mt-1">
                                    <span className="mr-1">2.</span>
                                    تتعهد الشركة / المؤسسة بعدم السماح لحاملها تجاوز التصريح بأداء فريضة الحج.
                                </li>
                                <li className="mt-1">
                                    <span className="mr-1">3.</span>
                                    يجب إبراز تصريح العمل وهوية مقيم لدى النقاط الأمنية.
                                </li>
                            </ol>

                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="p-2 text-right">
                <p className="text-sm text-gray-700">تاريخ الطباعة: {data?.printDate ?? "--"}</p>
            </div>
        </div>
    );
}