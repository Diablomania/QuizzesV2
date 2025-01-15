import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import { Head } from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import Button from "@/Components/Button.jsx";
import Select from "@/Components/Form/Select.jsx";
import { useState } from "react";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

export default function CreateQuiz({ categories, defaultLanguage, languages }) {
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

        try {
            await axios.post("/quiz/save", formData).then(({data}) => {
                Inertia.visit(route('quiz.edit', {id: data.id}));
            });
        } catch (error) {
            console.error("Error saving quiz: ", error);
        }
    };

    return (
        <SidebarLayout>
            <Head title="Create Quiz" />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 border rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase">Let's make a quiz in {defaultLanguage.name}</h2>
                    <Select
                        inputs={categories}
                        label="quiz category"
                        value={formData.category_id}
                        onChange={handleChange}
                        name="category_id"
                        setDefaultValue={(value) => handleDefaultValue("category_id", value)}
                    />
                    <Input
                        input="name"
                        label="quiz name"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <Input
                        input="description"
                        label="quiz description"
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                    />
                    <Input
                        input="img_url"
                        label="image url"
                        value={formData.img_url}
                        onChange={handleChange}
                        name="img_url"
                        required={false}
                    />

                    <Button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded" label="Add Question" />

                    {formData.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="p-4 my-4 border rounded-lg mt-2">
                            <Input
                                input="question"
                                label="Question:"
                                value={question.question}
                                onChange={(e) => handleInputChange(e, questionIndex)}
                                name="question"
                            />
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
                            <br />

                            <Button onClick={() => addAnswer(questionIndex)} label="Add Answer" />
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="mt-2">
                                    <Input
                                        input="answer"
                                        label="Answer:"
                                        value={answer.answer}
                                        onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                                        name="answer"
                                    />
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
                    ))}

                    <FormButton label="Save Quiz" />
                </form>
            </div>
        </SidebarLayout>
    );
}
