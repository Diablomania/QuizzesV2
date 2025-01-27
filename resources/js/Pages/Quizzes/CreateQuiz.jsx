import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import { Head } from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import Button from "@/Components/Button.jsx";
import Select from "@/Components/Form/Select.jsx";
import React, { useState } from "react";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";
import {useTranslation} from "react-i18next";
import LoadImage from "@/Components/Form/LoadImage.jsx";
import Swal from "sweetalert2";

export default function CreateQuiz({ categories, defaultLanguage, languages }) {
    const [t] = useTranslation();
    const [formData, setFormData] = useState({
        language_id: defaultLanguage.id,
        category_id: "",
        img_url: "",
        name: "",
        description: "",
        questions: [
            {
                is_multi_answers: false,
                img_url: "",
                question: "",
                answers: [
                    {
                        is_true: true,
                        img_url: "",
                        answer: "",
                    },
                ],
            },
        ],
    });

    const [isUploading, setIsUploading] = useState({
        "isUploading": false,
        questions: [
            {
                "isUploading": false,
                answers: [
                    {
                        "isUploading": false,
                    }
                ]
            }
        ]
    });
    console.log("Is Uploading: ",isUploading);

    const [files, setFiles] = useState({});
    console.log("Files: ",files);

    const fileSet = (file, questionIndex = null, answerIndex = null) => {
        setFiles((prev) => {
            const updatedFiles = { ...prev };

            if (!updatedFiles.questions) {
                updatedFiles.questions = [];
            }

            if (typeof questionIndex === "number" || questionIndex !== null) {
                if (!updatedFiles.questions[questionIndex]) {
                    updatedFiles.questions[questionIndex] = { file: null, answers: [] };
                }

                if (typeof answerIndex === "number" || answerIndex !== null) {
                    const question = updatedFiles.questions[questionIndex];

                    if (!question.answers) {
                        question.answers = [];
                    }

                    if (!question.answers[answerIndex]) {
                        question.answers[answerIndex] = { file: null };
                    }

                    question.answers[answerIndex].file = file;
                } else {
                    updatedFiles.questions[questionIndex].file = file;
                }
            } else {
                updatedFiles.file = file;
            }

            return updatedFiles;
        });
    };


    const isUploadingSet = (questionIndex, answerIndex = null) => {
        setIsUploading((prev) => {
            const updatedState = { ...prev }; // Копіюємо поточний стан

            if (!updatedState.questions) {
                updatedState.questions = [];
            }

            if (typeof questionIndex === "number") {
                if (!updatedState.questions[questionIndex]) {
                    updatedState.questions[questionIndex] = { isUploading: false, answers: [] };
                }

                const question = updatedState.questions[questionIndex];

                if (typeof answerIndex === "number") {
                    if (!question.answers) {
                        question.answers = [];
                    }

                    if (!question.answers[answerIndex]) {
                        question.answers[answerIndex] = { isUploading: false };
                    }

                    question.answers[answerIndex].isUploading = !question.answers[answerIndex].isUploading;
                } else {
                    question.isUploading = !question.isUploading;
                }
            } else {
                console.error("Invalid questionIndex. It must be a number.");
            }

            return updatedState;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDefaultValue = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addQuestion = () => {
        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    is_multi_answers: false,
                    img_url: "",
                    question: "",
                    answers: [
                        {
                            is_true: false,
                            img_url: "",
                            answer: "",
                        },
                    ],
                },
            ],
        }));
    };

    const addAnswer = (questionIndex) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q, idx) =>
                idx === questionIndex
                    ? {
                        ...q,
                        answers: [
                            ...q.answers,
                            {
                                is_true: false,
                                img_url: "",
                                answer: "",
                            },
                        ],
                    }
                    : q
            ),
        }));
    };

    const handleInputChange = (e, questionIndex, answerIndex) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedQuestions = prev.questions.map((q, qIdx) => {
                if (qIdx !== questionIndex) return q;

                if (name === "is_multi_answers" && !value) {
                    const updatedAnswers = q.answers.map((a, aIdx) => ({
                        ...a,
                        is_true: aIdx === 0,
                    }));
                    return {
                        ...q,
                        is_multi_answers: value,
                        answers: updatedAnswers,
                    };
                }

                if (answerIndex !== undefined) {
                    const updatedAnswers = q.answers.map((a, aIdx) => {
                        if (aIdx !== answerIndex) return a;

                        const updatedAnswer = {
                            ...a,
                            [name]: value,
                        };

                        if (name === "is_true" && !q.is_multi_answers && value) {
                            return { ...updatedAnswer, is_true: true };
                        }

                        return updatedAnswer;
                    });

                    if (
                        !updatedAnswers.some((a) => a.is_true) &&
                        !q.is_multi_answers
                    ) {
                        updatedAnswers[0].is_true = true;
                    }

                    return {
                        ...q,
                        answers: updatedAnswers,
                    };
                }

                return {
                    ...q,
                    [name]: value,
                };
            });

            return {
                ...prev,
                questions: updatedQuestions,
            };
        });
    };


    const handleIsTrueChange = (questionIndex, answerIndex) => {
        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q, qIdx) =>
                qIdx === questionIndex
                    ? {
                        ...q,
                        answers: q.answers.map((a, aIdx) => {
                            if (q.is_multi_answers) {
                                return aIdx === answerIndex
                                    ? { ...a, is_true: !a.is_true }
                                    : a;
                            } else {
                                return {
                                    ...a,
                                    is_true: aIdx === answerIndex,
                                };
                            }
                        }),
                    }
                    : q
            ),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (files.file && !formData.img_url) {
            const formDataWithFile = new FormData();
            formDataWithFile.append("image", files.file);

            try {
                const response = await axios.post("/upload-image", formDataWithFile, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                formData.img_url = response.data.imageUrl;
            } catch (error) {
                console.error("Error uploading image:", error);
                Swal.fire({
                    title: "Error!",
                    text: `Failed to save the quiz category image. Error: ${error.response?.data?.message || error.message}`,
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }
        }

        for (let questionIndex = 0; questionIndex < files.questions.length; questionIndex++) {
            const question = files.questions[questionIndex];

            if (question.file && !formData.questions[questionIndex]?.img_url) {
                const formDataWithFile = new FormData();
                formDataWithFile.append("image", question.file);

                try {
                    const response = await axios.post("/upload-image", formDataWithFile, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });

                    formData.questions[questionIndex].img_url = response.data.imageUrl;
                } catch (error) {
                    console.error(`Error uploading image for question ${questionIndex}:`, error);
                    Swal.fire({
                        title: "Error!",
                        text: `Failed to save the question image. Error: ${error.response?.data?.message || error.message}`,
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }
            }

            if (question.answers) {
                for (let answerIndex = 0; answerIndex < question.answers.length; answerIndex++) {
                    const answer = question.answers[answerIndex];

                    if (answer.file && !formData.questions[questionIndex]?.answers[answerIndex]?.img_url) {
                        const formDataWithFile = new FormData();
                        formDataWithFile.append("image", answer.file);

                        try {
                            const response = await axios.post("/upload-image", formDataWithFile, {
                                headers: { "Content-Type": "multipart/form-data" },
                            });

                            formData.questions[questionIndex].answers[answerIndex].img_url =
                                response.data.imageUrl;
                        } catch (error) {
                            console.error(
                                `Error uploading image for answer ${answerIndex} in question ${questionIndex}:`,
                                error
                            );
                            Swal.fire({
                                title: "Error!",
                                text: `Failed to save the answer image. Error: ${error.response?.data?.message || error.message}`,
                                icon: "error",
                                confirmButtonText: "OK",
                            });
                            return;
                        }
                    }
                }
            }
        }

        try {
            const response = await axios.post("/quiz/save", formData);
            Inertia.visit(route("quiz.edit", { id: response.data.id }));
        } catch (error) {
            console.error("Error saving quiz: ", error);
            Swal.fire({
                title: "Error!",
                text: `Failed to save the quiz. Error: ${error.response?.data?.message || error.message}`,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <SidebarLayout>
            <Head title="Create Quiz" />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase text-gray-200">{t("createQuiz.hey")}{defaultLanguage.name}</h2>
                    <Select
                        inputs={categories}
                        label={t("createQuiz.quizCategory")}
                        value={formData.category_id}
                        onChange={handleChange}
                        name="category_id"
                        setDefaultValue={(value) => handleDefaultValue("category_id", value)}
                    />
                    <Input
                        input="name"
                        label={t("createQuiz.quizName")}
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <Input
                        input="description"
                        label={t("createQuiz.quizDescription")}
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
                            onClick={() => setIsUploading((prev) => {
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        img_url: ""
                                    }
                                });

                                return {
                                    ...prev,
                                    "isUploading": !isUploading.isUploading
                                }
                            })}
                            onKeyDown={(e) => e.key === "Enter" && setIsUploading((prev) => {
                                setFormData((prev) => {
                                    return {
                                        ...prev,
                                        img_url: ""
                                    }
                                });

                                return {
                                    ...prev,
                                    "isUploading": !isUploading.isUploading
                                }
                            })}
                            className={`w-8 h-4 flex items-center rounded-full px-1 cursor-pointer ${
                                isUploading.isUploading ? "bg-indigo-600" : "bg-gray-400"
                            }`}
                        >
                            <div
                                className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-300 ${
                                    isUploading.isUploading ? "translate-x-3" : ""
                                }`}
                            ></div>
                        </div>
                    </div>

                    {!isUploading.isUploading ? (
                        <Input
                            input="img_url"
                            label={t("addQuizCategory.quizImageUrlLabel")}
                            value={formData.img_url}
                            onChange={handleChange}
                            name="img_url"
                            required={false}
                        />
                    ) : (
                        <LoadImage fileSet={fileSet}/>
                    )}

                    <Button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded"
                            label={t("createQuiz.addQuestionButton")}/>

                    {formData.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="p-4 my-4 rounded-lg mt-2">
                            <Input
                                input="question"
                                label={t("createQuiz.questionLabel")}
                                value={question.question}
                                onChange={(e) => handleInputChange(e, questionIndex)}
                                name="question"
                            />


                            <div className="mb-4 flex items-center space-x-4">
                                <span className="text-gray-400 text-sm">
                                    {t("fileForm.switchLabel")}
                                </span>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                        isUploadingSet(questionIndex);
                                    }}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        isUploadingSet(questionIndex)
                                    }
                                    className={`w-8 h-4 flex items-center rounded-full px-1 cursor-pointer ${
                                        isUploading?.questions?.[questionIndex]?.isUploading ? "bg-indigo-600" : "bg-gray-400"
                                    }`}
                                >
                                    <div
                                        className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-300 ${
                                            isUploading?.questions?.[questionIndex]?.isUploading ? "translate-x-3" : ""
                                        }`}
                                    ></div>
                                </div>
                            </div>

                            {!isUploading.questions[questionIndex]?.isUploading ? (
                            <Input
                                input="img_url"
                                label={t("createQuiz.questionImageLabel")}
                                value={question.img_url}
                                onChange={(e) => handleInputChange(e, questionIndex)}
                                name="img_url"
                                required={false}
                            />
                            ) : (
                                <LoadImage fileSet={fileSet} questionIndex={questionIndex}/>
                            )}

                            <label className="text-gray-400">
                                {t("createQuiz.isMulti")}
                                <input
                                    type="checkbox"
                                    name="is_multi_answers"
                                    checked={question.is_multi_answers}
                                    onChange={(e) =>
                                        handleInputChange(
                                            {
                                                target: {
                                                    name: "is_multi_answers",
                                                    value: e.target.checked,
                                                },
                                            },
                                            questionIndex
                                        )
                                    }
                                />
                            </label>
                            <br/>

                            <Button onClick={() => addAnswer(questionIndex)} label={t("createQuiz.addAnswerButton")}/>
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="mt-2">
                                    <Input
                                        input="answer"
                                        label={t("createQuiz.answerLabel")}
                                        value={answer.answer}
                                        onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                                        name="answer"
                                    />



                                    <div className="mb-4 flex items-center space-x-4">
                                        <span className="text-gray-400 text-sm">
                                            {t("fileForm.switchLabel")}
                                        </span>
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => {
                                                isUploadingSet(questionIndex, answerIndex);
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && isUploadingSet(questionIndex, answerIndex)}
                                            className={`w-8 h-4 flex items-center rounded-full px-1 cursor-pointer ${
                                                isUploading.questions[questionIndex]?.answers[answerIndex]?.isUploading ? "bg-indigo-600" : "bg-gray-400"
                                            }`}
                                        >
                                            <div
                                                className={`w-3 h-3 bg-white rounded-full shadow-md transform duration-300 ${
                                                    isUploading.questions[questionIndex]?.answers[answerIndex]?.isUploading ? "translate-x-3" : ""
                                                }`}
                                            ></div>
                                        </div>
                                    </div>

                                    {!isUploading.questions[questionIndex]?.answers[answerIndex]?.isUploading ? (
                                        <Input
                                            input="img_url"
                                            label={t("createQuiz.answerImageLabel")}
                                            value={answer.img_url}
                                            onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                                            name="img_url"
                                            required={false}
                                        />
                                    ) : (
                                        <LoadImage fileSet={fileSet} questionIndex={questionIndex} answerIndex={answerIndex}/>
                                    )}

                                    <label className="text-gray-400">
                                        {t("createQuiz.isTrue")}
                                        <input
                                            type="checkbox"
                                            name="is_true"
                                            checked={answer.is_true}
                                            onChange={() => handleIsTrueChange(questionIndex, answerIndex)}
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <FormButton label={t("createQuiz.saveQuizButton")}/>
                </form>
            </div>
        </SidebarLayout>
    );
}
