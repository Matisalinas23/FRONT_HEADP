import Image from 'next/image';
import React, { useState } from 'react'

type ImageSelectorProps = {
    formik: any
}

export default function ImageSelector({ formik }: ImageSelectorProps) {
    const [preview, setPreview] = useState<string | null>(null); // Temporaly URL of image selected by user

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            formik.setFieldValue("image", file);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <input id="image" name="image" type="file" accept="image/*" className="hidden" onChange={handleFileChange}/>

            {preview && <Image src={preview} alt="Preview" width={100} height={100} />}

            <button type="button" className="bg-blue-500 text-white px-4 h-8 w-full"
            onClick={() => document.getElementById("image")?.click()}
            >
                Subir Imagen
            </button>
        </div>
    )
}
