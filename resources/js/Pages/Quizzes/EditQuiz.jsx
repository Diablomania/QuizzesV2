import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import { Head } from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import Button from "@/Components/Button.jsx";
import Select from "@/Components/Form/Select.jsx";
import { useState } from "react";
import axios from "axios";
import CloseButton from "@/Components/CloseButton.jsx";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";

export default function EditQuiz({ quiz, categories, defaultLanguage, languages }) {
    const [t] = useTranslation();
    const [formData, setFormData] = useState(quiz);

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

    const deleteAnswer = async (e, questionIndex, answerIndex, answerId) => {
        e.preventDefault();

        if (answerId) {
            Swal.fire({
                title: t("editQuiz.deleteAnswerModal.title"),
                text: t("editQuiz.deleteAnswerModal.text"),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t("editQuiz.deleteAnswerModal.confirmButtonText"),
                cancelButtonText: t("editQuiz.deleteAnswerModal.cancelButtonText"),
            }).then(async (result) => {
                if (result.isConfirmed) {

                    try {
                        await axios.delete("/quiz/answer/"+answerId, formData).then(() => {
                            Swal.fire({
                                title: t("editQuiz.deleteAnswerModal.answer.title"),
                                text: t("editQuiz.deleteAnswerModal.answer.text"),
                                icon: 'success',
                                confirmButtonText: t("editQuiz.deleteAnswerModal.answer.confirmButtonText"),
                            }).then(() => {
                                window.location.reload();
                            });
                        });
                    } catch (error) {
                        console.error("Error deleting answer: ", error);

                        setFormData((prev) => {
                            const updatedQuestions = prev.questions.map((question, qIdx) => {
                                if (qIdx === questionIndex) {
                                    const updatedAnswers = question.answers.map((answer, aIdx) => {
                                        if (aIdx === answerIndex) {
                                            return {
                                                ...answer,
                                                error: error.response.data.error,
                                            }
                                        }
                                    });

                                    return {
                                        ...question,
                                        answers: updatedAnswers,
                                    };
                                }
                                return question;
                            });

                            return {
                                ...prev,
                                questions: updatedQuestions,
                            };
                        });
                    }
                }});
        } else {
            setFormData((prev) => {
                const updatedQuestions = prev.questions.map((question, qIdx) => {
                    if (qIdx === questionIndex) {
                        const updatedAnswers = question.answers.filter((_, aIdx) => aIdx !== answerIndex);
                        return {
                            ...question,
                            answers: updatedAnswers,
                        };
                    }
                    return question;
                });

                return {
                    ...prev,
                    questions: updatedQuestions,
                };
            });
        }
    };

    const deleteQuestion = async (e, questionIndex, questionId) => {
        e.preventDefault();

        if (questionId) {
            Swal.fire({
                title: t("editQuiz.deleteQuestionModal.title"),
                text: t("editQuiz.deleteQuestionModal.text"),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t("editQuiz.deleteQuestionModal.confirmButtonText"),
                cancelButtonText: t("editQuiz.deleteQuestionModal.cancelButtonText"),
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete("/quiz/question/"+questionId, formData).then(() => {
                            Swal.fire({
                                title: t("editQuiz.deleteQuestionModal.answer.title"),
                                text: t("editQuiz.deleteQuestionModal.answer.text"),
                                icon: 'success',
                                confirmButtonText: t("editQuiz.deleteQuestionModal.answer.confirmButtonText"),
                            }).then(() => {
                                window.location.reload();
                            });
                        });
                    } catch (error) {
                        console.error("Error deleting question: ", error);

                        setFormData((prev) => {
                            const updatedQuestions = prev.questions.map((question, qIdx) => {
                                if (qIdx === questionIndex) {

                                    return {
                                        ...question,
                                        error: error.response.data.error,
                                    };
                                }
                                return question;
                            });

                            return {
                                ...prev,
                                questions: updatedQuestions,
                            };
                        });
                    }
                }});
        } else {
            setFormData((prev) => {
                const updatedQuestions = prev.questions.filter((_, qIdx) => qIdx !== questionIndex);

                return {
                    ...prev,
                    questions: updatedQuestions,
                };
            });
        }
    };

    const addQuestion = () => {
        const translations = formData.translations.map((t) => {
            return {
                language_id: t.language_id,
                question: "",
            };
        });
        const translates = formData.translations.map((t) => {
            return {
                language_id: t.language_id,
                answer: "",
            };
        });

        setFormData((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    quizzes_id: formData.id,
                    is_multi_answers: 0,
                    img_url: null,
                    answers: [
                        {
                            is_true: false,
                            img_url: null,
                            translates: translates
                        },
                    ],
                    translations: translations
                },
            ],
        }));
    };

    const addAnswer = (questionIndex) => {
        const translates = formData.translations.map((t) => {
            return {
                language_id: t.language_id,
                answer: ""
            };
        });

        setFormData((prev) => ({
            ...prev,
            questions: prev.questions.map((q, idx) => {
                if (idx === questionIndex) {
                    const newAnswer = {
                        is_true: false,
                        img_url: null,
                        translates: translates,
                    };

                    if (q.id) {
                        newAnswer.quizzes_questions_id = q.id;
                    }

                    return {
                        ...q,
                        answers: [
                            ...q.answers,
                            newAnswer,
                        ],
                    };
                }

                return q;
            }),
        }));
    };

    const handleQuestionTranslateInputChange = (e, questionIndex, translateIndex) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedQuestions = prev.questions.map((q, qIdx) => {
                if (qIdx !== questionIndex) return q;

                const updatedTranslations = q.translations.map((t, tIdx) => {
                    if (tIdx !== translateIndex) return t;

                    return {
                        ...t,
                        [name]: value,
                    };
                })

                return {
                    ...q,
                    error: "",
                    translations: updatedTranslations,
                };
            });

            return {
                ...prev,
                questions: updatedQuestions,
            };
        })
    }

    const handleQuizInputChange = (e, quizIndex) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedTranslations = prev.translations.map((q, qIdx) => {
                if (qIdx !== quizIndex) return q;

                return {
                    ...q,
                    [name]: value,
                };
            });

            return {
                ...prev,
                translations: updatedTranslations,
            };
        })
    }

    const handleInputChange = (e, questionIndex, answerIndex, answerTranslateIndex) => {
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

                        let updatedAnswer = {
                            ...a,
                            error: "",
                            [name]: value,
                        };

                        if (answerTranslateIndex !== undefined) {
                            const updatedAnswerTranslates = a.translates.map((t, tIdx) => {
                                if (tIdx !== answerTranslateIndex) return t;

                                return {
                                    ...t,
                                    [name]: value,
                                }
                            })

                            updatedAnswer = {
                                ...updatedAnswer,
                                translates: updatedAnswerTranslates,
                            }
                        } else {
                            if (name === "is_true" && !q.is_multi_answers && value) {
                                return { ...updatedAnswer, is_true: true };
                            }
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

        try {
            await axios.put("/quiz/update", formData).then(({data}) => {
                window.location.reload();
            });
        } catch (error) {
            console.log("Error saving quiz: ", error.response.data.errors);
            setFormData((prev) => ({
                ...prev,
                error: error.response.data.errors,
            }));
        }
    };

    const getLanguageNameById = (languageId) => {
        const language = languages.find(lang => lang.id === parseInt(languageId));
        return language ? language.name : t("editQuiz.unknownLanguage");
    };

    return (
        <SidebarLayout>
            <Head title={t("editQuiz.head")} />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase text-gray-200">{t("editQuiz.title")}</h2>
                    {formData.error && Object.keys(formData.error).length > 0 && (
                        <div
                            className="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400"
                            role="alert"
                        >
                            {Object.entries(formData.error).map(([key, message]) => (
                                <div key={key}>
                                    <span className="font-medium">
                                        {message}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <Select
                        inputs={categories}
                        label={t("editQuiz.quizCategoryLabel")}
                        value={formData.category_id}
                        onChange={handleChange}
                        name="category_id"
                        setDefaultValue={(value) => handleDefaultValue("category_id", value)}
                    />
                    <Input
                        input="img_url"
                        label={t("editQuiz.quizImageUrlLabel")}
                        value={formData.img_url}
                        onChange={handleChange}
                        name="img_url"
                        required={false}
                    />

                    {formData.translations.map((quizTrans, quizIndex) => {
                        return (
                            <>
                                <Input
                                    input="name"
                                    label={t("editQuiz.quizName") + getLanguageNameById(quizTrans.language_id)}
                                    value={quizTrans.name}
                                    onChange={(e) => handleQuizInputChange(e, quizIndex)}
                                    name="name"
                                />
                                <Input
                                    input="description"
                                    label={t("editQuiz.quizDescription") + getLanguageNameById(quizTrans.language_id)}
                                    value={quizTrans.description}
                                    onChange={(e) => handleQuizInputChange(e, quizIndex)}
                                    name="description"
                                />
                            </>
                        )
                    })}

                    <Button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded" label={t("editQuiz.addQuestionButton")} />

                    {formData.questions.map((question, questionIndex) => {
                        const questionTranslate = question.translations.find(
                            (translation) => translation.language_id === parseInt(defaultLanguage.id));

                        return (
                            <div key={questionIndex} className="p-4 my-4 rounded-lg mt-2">
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-gray-200">
                                        {questionTranslate ? (
                                            t("editQuiz.questionLabel") + " " + (questionIndex + 1) + ": " + questionTranslate.question

                                        ) : (
                                            t("editQuiz.questionLabel") + (questionIndex + 1) + t("editQuiz.questionNoTranslationLabel")
                                        )}
                                    </h4>
                                    <CloseButton label={t("editQuiz.deleteButton")} onClick={(e) => deleteQuestion(e, questionIndex, question.id ?? null)} />
                                </div>
                                {question.error && (<div className="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400" role="alert">
                                    <span className="font-medium">{question.error}</span>
                                </div>)}

                                {question.translations.map((questionTrans, questionTranslateIndex) => {
                                    return (
                                        <>
                                            <Input
                                                input="question"
                                                label={t("editQuiz.questionLabel") + " " + getLanguageNameById(questionTrans.language_id)}
                                                value={questionTrans.question}
                                                onChange={(e) => handleQuestionTranslateInputChange(e, questionIndex, questionTranslateIndex)}
                                                name="question"
                                            />
                                        </>
                                    )
                                })}

                                <Input
                                    input="img_url"
                                    label={t("editQuiz.questionImageUrlLabel")}
                                    value={question.img_url}
                                    onChange={(e) => handleInputChange(e, questionIndex)}
                                    name="img_url"
                                    required={false}
                                />
                                <label className="text-gray-400">
                                    {t("editQuiz.isMulti")}
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

                                <Button onClick={() => addAnswer(questionIndex)} label={t("editQuiz.addAnswerLabel")}/>
                                {question.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="p-4 my-4 rounded-lg mt-2">
                                        <div className="flex justify-between">
                                            <h4 className="font-bold text-gray-200">{t("editQuiz.answerLabel") + " " + (answerIndex + 1)}</h4>
                                            <CloseButton label={t("editQuiz.deleteButton")}
                                                         onClick={(e) => deleteAnswer(e, questionIndex, answerIndex, answer.id ?? null)}/>
                                        </div>
                                        {answer.error && (<div className="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-red-400" role="alert">
                                            <span className="font-medium">{answer.error}</span>
                                        </div>)}

                                        {answer.translates.map((answerTrans, answerTranslateIndex) => {
                                            return (
                                                <>
                                                    <Input
                                                        input="answer"
                                                        label={t("editQuiz.answerLabel") + " " + getLanguageNameById(answerTrans.language_id)}
                                                        value={answerTrans.answer}
                                                        onChange={(e) => handleInputChange(e, questionIndex, answerIndex, answerTranslateIndex)}
                                                        name="answer"
                                                    />
                                                </>
                                            )
                                        })}
                                        <Input
                                            input="img_url"
                                            label={t("editQuiz.answerImageUrlLabel")}
                                            value={answer.img_url}
                                            onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                                            name="img_url"
                                            required={false}
                                        />
                                        <label className="text-gray-400">
                                            {t("editQuiz.isTrue")}
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
                        )
                    })}

                    <FormButton label={t("editQuiz.saveQuizButton")} />
                </form>
            </div>
        </SidebarLayout>
    );
}
