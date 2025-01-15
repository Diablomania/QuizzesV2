import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import { Head } from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import Button from "@/Components/Button.jsx";
import Select from "@/Components/Form/Select.jsx";
import { useState } from "react";
import axios from "axios";
import CloseButton from "@/Components/CloseButton.jsx";

export default function EditQuiz({ quiz, categories, defaultLanguage, languages }) {
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
            try {
                await axios.delete("/quiz/answer/"+answerId, formData).then(({data}) => {
                    window.location.reload();
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
            try {
                await axios.delete("/quiz/question/"+questionId, formData).then(({data}) => {
                    window.location.reload();
                });
            } catch (error) {
                console.error("Error deleting answer: ", error);

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
        console.log("Submit", formData);

        try {
            await axios.put("/quiz/update", formData).then(({data}) => {
                console.log("Answer", data);
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
        return language ? language.name : "Unknown Language";
    };

    return (
        <SidebarLayout>
            <Head title="Create Quiz" />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 border rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase">Let's edit a quiz</h2>
                    {formData.error && Object.keys(formData.error).length > 0 && (
                        <div
                            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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
                        label="quiz category"
                        value={formData.category_id}
                        onChange={handleChange}
                        name="category_id"
                        setDefaultValue={(value) => handleDefaultValue("category_id", value)}
                    />
                    <Input
                        input="img_url"
                        label="image url"
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
                                    label={"quiz name " + getLanguageNameById(quizTrans.language_id)}
                                    value={quizTrans.name}
                                    onChange={(e) => handleQuizInputChange(e, quizIndex)}
                                    name="name"
                                />
                                <Input
                                    input="description"
                                    label={"quiz description " + getLanguageNameById(quizTrans.language_id)}
                                    value={quizTrans.description}
                                    onChange={(e) => handleQuizInputChange(e, quizIndex)}
                                    name="description"
                                />
                            </>
                        )
                    })}

                    <Button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded" label="Add Question" />

                    {formData.questions.map((question, questionIndex) => {
                        const questionTranslate = question.translations.find(
                            (translation) => translation.language_id === parseInt(defaultLanguage.id));

                        return (
                            <div key={questionIndex} className="p-4 my-4 border rounded-lg mt-2">
                                <div className="flex justify-between">
                                    <h4 className="font-bold">
                                        {questionTranslate ? (
                                            "Question " + (questionIndex + 1) + ": " + questionTranslate.question

                                        ) : (
                                            "Question " + (questionIndex + 1) + ": No translation available"
                                        )}
                                    </h4>
                                    <CloseButton label="Delete"  onClick={(e) => deleteQuestion(e, questionIndex, question.id ?? null)} />
                                </div>
                                {question.error && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    <span className="font-medium">{question.error}</span>
                                </div>)}

                                {question.translations.map((questionTrans, questionTranslateIndex) => {
                                    return (
                                        <>
                                            <Input
                                                input="question"
                                                label={"Question " + getLanguageNameById(questionTrans.language_id)}
                                                value={questionTrans.question}
                                                onChange={(e) => handleQuestionTranslateInputChange(e, questionIndex, questionTranslateIndex)}
                                                name="question"
                                            />
                                        </>
                                    )
                                })}

                                <Input
                                    input="img_url"
                                    label="Question image url"
                                    value={question.img_url}
                                    onChange={(e) => handleInputChange(e, questionIndex)}
                                    name="img_url"
                                    required={false}
                                />
                                <label>
                                    Is Multi:
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

                                <Button onClick={() => addAnswer(questionIndex)} label="Add Answer"/>
                                {question.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="p-4 my-4 border rounded-lg mt-2">
                                        <div className="flex justify-between">
                                            <h4 className="font-bold">Answer {(answerIndex + 1)}</h4>
                                            <CloseButton label="Delete"
                                                         onClick={(e) => deleteAnswer(e, questionIndex, answerIndex, answer.id ?? null)}/>
                                        </div>
                                        {answer.error && (<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                            <span className="font-medium">{answer.error}</span>
                                        </div>)}

                                        {answer.translates.map((answerTrans, answerTranslateIndex) => {
                                            return (
                                                <>
                                                    <Input
                                                        input="answer"
                                                        label={"Answer " + getLanguageNameById(answerTrans.language_id)}
                                                        value={answerTrans.answer}
                                                        onChange={(e) => handleInputChange(e, questionIndex, answerIndex, answerTranslateIndex)}
                                                        name="answer"
                                                    />
                                                </>
                                            )
                                        })}
                                        <Input
                                            input="img_url"
                                            label="Answer image url"
                                            value={answer.img_url}
                                            onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                                            name="img_url"
                                            required={false}
                                        />
                                        <label>
                                            Is True:
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

                    <FormButton label="Save Quiz"/>
                </form>
            </div>
        </SidebarLayout>
    );
}
