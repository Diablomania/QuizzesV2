import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import { Head } from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import Button from "@/Components/Button.jsx";
import Select from "@/Components/Form/Select.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import CloseButton from "@/Components/CloseButton.jsx";
import {Inertia} from "@inertiajs/inertia";

export default function EditQuizCategory({ category, languages }) {
    const [formData, setFormData] = useState(category);
    const [isTranslate, setIsTranslate] = useState(false);
    const [currentTranslation, setCurrentTranslation] = useState(category.translations[0]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        setCurrentTranslation(formData.translations.find(
            (translate) => translate.language_id == formData.language_id
        ) ?? false);
    }, [formData.language_id, formData.translations]);

    useEffect(() => {
        setIsTranslate(!!currentTranslation);
    }, [currentTranslation]);

    const handleChangeTranslate = (e, index) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            translations: prev.translations.map((translation, idx) =>
                idx === index ? { ...translation, [name]: value } : translation
            ),
        }));
    };

    const addTranslate = (language_id) => {
        setFormData((prev) => ({
            ...prev,
            translations: [
                ...prev.translations,
                {
                    language_id: language_id,
                    name: "",
                    description: "",
                    quizzes_categories_id: formData.id,
                }
            ]
        }));
    };

    const handleLanguageValue = (languageId) => {
        setFormData((prev) => {

            return {
                ...prev,
                language_id: languageId,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put("/quiz/category/update", formData).then(({data}) => {
                setFormData(data);
            });
        } catch (error) {
            console.error("Error updating quiz category: ", error);
        }
    }

    return (
        <SidebarLayout>
            <Head title="Edit Quiz Category" />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase text-gray-200">Let's edit a quiz category</h2>

                    <Select
                        inputs={languages}
                        label="choose translated language"
                        value={formData.language_id}
                        onChange={(e) => handleLanguageValue(e.target.value)}
                        name="language_id"
                        setDefaultValue={(value) => handleLanguageValue(value)}
                    />

                    {isTranslate ? (
                        <>
                            <Input
                                input="name"
                                label="Name"
                                value={currentTranslation.name || ""}
                                onChange={(e) => handleChangeTranslate(e, formData.translations.indexOf(currentTranslation))}
                                name="name"
                                required={false}
                            />
                            <Input
                                input="description"
                                label="Description"
                                value={currentTranslation.description || ""}
                                onChange={(e) => handleChangeTranslate(e, formData.translations.indexOf(currentTranslation))}
                                name="description"
                                required={false}
                            />
                        </>
                    ) : (
                        <>
                            <p className="text-gray-200">No translation available for the selected language</p>
                            <Button
                                onClick={() => addTranslate(formData.language_id)}
                                label="Add Translation"
                            />
                        </>
                    )}

                    <Input
                        input="img_url"
                        label="image url"
                        value={formData.img_url}
                        onChange={handleChange}
                        name="img_url"
                        required={false}
                    />

                    <FormButton label="Save Quiz"/>
                </form>
            </div>
        </SidebarLayout>
    );
}
