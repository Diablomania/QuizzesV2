import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";
import Select from "@/Components/Form/Select.jsx";

export default function GuestLayoutV2({ children }) {
    const [t, i18n] = useTranslation();
    const [formData, setFormData] = useState({});
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const detectBrowserLanguage = (languages) => {
        const browserLanguage = navigator.language || navigator.languages[0];
        const matchedLanguage = languages.find(lang => lang.short_name === browserLanguage.split('-')[0]); // Порівняння короткого імені
        return matchedLanguage ? matchedLanguage.id : null;
    };

    useEffect(() => {
        if (formData.language_id) {
            const selectedLanguage = data.languages?.find(lang => lang.id === formData.language_id);
            if (selectedLanguage) {
                i18n.changeLanguage(selectedLanguage.short_name);
                localStorage.setItem("selectedLanguage", formData.language_id); // Зберігаємо вибрану мову
            }
        }
    }, [formData.language_id, data.languages]);

    const getLanguage = async () => {
        try {
            const response = await axios.post("/get-languages");
            const languages = response.data.languages;
            const userLanguageId = response.data?.user?.settings?.languages_id;

            const savedLanguageId = localStorage.getItem("selectedLanguage");

            const initialLanguageId = savedLanguageId
                ? parseInt(savedLanguageId, 10)
                : userLanguageId || detectBrowserLanguage(languages) || 1;

            setData(response.data);
            setFormData((prev) => ({
                ...prev,
                language_id: initialLanguageId,
            }));

            const initialLanguage = languages.find(lang => lang.id === initialLanguageId);
            i18n.changeLanguage(initialLanguage?.short_name || navigator.language);
            setIsLoading(false);
        } catch (error) {
            console.error("Error getting language:", error);
        }
    };

    useEffect(() => {
        getLanguage();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseInt(value, 10),
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black relative overflow-hidden">
                <div className="absolute top-4 right-4 z-10">
                    <Select
                        inputs={data.languages ?? []}
                        value={formData.language_id || 1}
                        onChange={handleChange}
                        name="language_id"
                    />
                </div>
                <div
                    className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-50 top-1/4 left-1/4 animate-pulse"/>
                <div
                    className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full blur-3xl opacity-40 top-2/3 left-2/3 animate-pulse"></div>
                <div
                    className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full blur-3xl opacity-30 top-1/3 right-1/3 animate-pulse"></div>
                <div className="relative text-white flex flex-col items-center justify-center h-full space-y-4">
                    {children}
                </div>
            </div>
        </>
    );
}
