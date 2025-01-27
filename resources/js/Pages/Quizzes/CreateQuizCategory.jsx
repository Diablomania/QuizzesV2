import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import { Head } from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import React, { useState } from "react";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";
import {useTranslation} from "react-i18next";
import LoadImage from "@/Components/Form/LoadImage.jsx";
import Swal from "sweetalert2";

export default function CreateQuizCategory({ categories, defaultLanguage, languages }) {
    const [t] = useTranslation();
    const [formData, setFormData] = useState({
        language_id: defaultLanguage.id,
        img_url: "",
        name: "",
        description: "",
    });

    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);

    const fileSet = (file) => {
        setFile(file);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isUploading && file) {
            const formDataWithFile = new FormData();
            formDataWithFile.append("image", file);

            try {
                const response = await axios.post("/upload-image", formDataWithFile, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                formData.img_url = response.data.imageUrl;
            } catch (error) {
                console.error("Error uploading image:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to save the quiz category image. Please try again. Error: "+error.response.data.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }
        }

        try {
            await axios.post("/quiz/category/save", formData).then(({data}) => {
                Inertia.visit(route('quizzes.categories.edit'));
            });
        } catch (error) {
            console.error("Error saving quiz: ", error);
        }
    };

    return (
        <SidebarLayout>
            <Head title={t("addQuizCategory.head")} />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase text-gray-200">
                        {t("addQuizCategory.title")}
                        {defaultLanguage.name}
                    </h2>
                    <Input
                        input="name"
                        label={t("addQuizCategory.quizNameLabel")}
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <Input
                        input="description"
                        label={t("addQuizCategory.quizDescriptionLabel")}
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                    />

                    <div className="mb-4 flex items-center space-x-4">
                        <span className="text-gray-400 text-sm">
                            {t("fileForm.switchLabel")}
                        </span>
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setIsUploading(!isUploading)}
                            onKeyDown={(e) => e.key === "Enter" && setIsUploading(!isUploading)}
                            className={`w-8 h-4 flex items-center rounded-full px-1 cursor-pointer ${
                                isUploading ? "bg-indigo-600" : "bg-gray-400"
                            }`}
                        >
                            <div
                                className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-300 ${
                                    isUploading ? "translate-x-3" : ""
                                }`}
                            ></div>
                        </div>
                    </div>

                    {!isUploading ? (
                        <Input
                            input="img_url"
                            label={t("addQuizCategory.quizImageUrlLabel")}
                            value={formData.img_url}
                            onChange={handleChange}
                            name="img_url"
                            required={false}
                        />
                    ) : (
                        <LoadImage fileSet={fileSet} />
                    )}

                    <FormButton label={t("addQuizCategory.saveQuizCategoryButton")}/>
                </form>
            </div>
        </SidebarLayout>
    );
}
