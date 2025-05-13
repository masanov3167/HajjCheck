import { Dispatch, SetStateAction } from "react"

type Props = {
    imagePreview: string | null,
    setImagePreview: Dispatch<SetStateAction<string | null>>,
    setFieldValue: any
}

const CertificateImg = ({ imagePreview, setImagePreview, setFieldValue }: Props) => {
    return (
        <div className="w-full my-5 col-span-2 flex justify-center">
            <div className="w-[142px] h-[142px] border bg-primaryBackground rounded-[10px]">
                <div className="flex justify-center mb-4 w-full h-full">
                    <label htmlFor="image-input" className={`cursor-pointer w-full h-full`}>
                        <div className="w-full h-full relative flex justify-center items-center">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    className="w-[142px] h-[142px] rounded-[10px] object-cover"
                                    alt="Image Preview"
                                />
                            ) : (
                                <div className="w-[70%] h-[70%] flex justify-center items-center text-[#878F9B]">
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
                            <div className="w-[30px] h-[30px] absolute right-2 bottom-2 text-[#878F9B] p-1 bg-backgroundWhite flex justify-center items-center rounded-[10px]">
                                <svg width="100%"
                                    height="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M15.1371 13.2241C14.7769 13.1049 14.3973 13.0279 14.0026 12.9992C12.6378 12.8997 11.3658 12.8998 9.99843 12.9997C7.60511 13.1745 5.76638 15.12 5.42358 17.5007L5.35799 17.9562C5.1602 19.3298 6.11389 20.6112 7.49065 20.7584C8.54973 20.8716 10.0131 20.9619 11.0887 21.0047M14.1069 18.4885L13.9956 20.3085C13.9883 20.4284 14.0876 20.5277 14.2075 20.5203L16.0274 20.4091C16.0578 20.4072 16.0865 20.3943 16.108 20.3728L19.5336 16.9472C20.0761 16.4047 20.0761 15.525 19.5336 14.9824C18.991 14.4398 18.1113 14.4398 17.5687 14.9824L14.1432 18.408C14.1217 18.4295 14.1087 18.4581 14.1069 18.4885ZM15.4994 6.5C15.4994 8.433 13.9324 10 11.9994 10C10.0664 10 8.49939 8.433 8.49939 6.5C8.49939 4.567 10.0664 3 11.9994 3C13.9324 3 15.4994 4.567 15.4994 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </div>
                        </div>
                    </label>
                </div>
                <input
                    // {...register("photo")}
                    type="file"
                    id="image-input"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                            const url = URL.createObjectURL(file);
                            setImagePreview(url);
                            setFieldValue('photo_url', file);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default CertificateImg