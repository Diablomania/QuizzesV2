import axios from 'axios';
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import Select from "@/Components/Form/Select.jsx";
import {useState} from "react";
import Button from "@/Components/Form/Button.jsx";

export default function CreateQuizTranslate({ quiz, defaultQuizTranslate, languages }) {
    const [formData, setFormData] = useState(quiz);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLanguageValue = (languageId) => {
        setFormData((prev) => {
            const quizTranslation = prev.translations.find(
                (translation) => translation.language_id === parseInt(languageId)
            );

            const updatedQuestions = prev.questions.map((question) => {
                const questionTranslation = question.translations.find(
                    (translation) => translation.language_id === parseInt(languageId)
                );

                const updatedAnswers = question.answers.map((answer) => {
                    const answerTranslation = answer.translates.find(
                        (translate) => translate.language_id === parseInt(languageId)
                    );

                    return {
                        ...answer,
                        answer: answerTranslation ? answerTranslation.answer : "",
                    };
                });

                return {
                    ...question,
                    question: questionTranslation ? questionTranslation.question : "",
                    answers: updatedAnswers,
                };
            });

            return {
                ...prev,
                language_id: languageId,
                name: quizTranslation ? quizTranslation.name : "",
                description: quizTranslation ? quizTranslation.description : "",
                questions: updatedQuestions,
            };
        });
    };

    const handleInputChange = (e, questionIndex, answerIndex) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const updatedQuestions = prev.questions.map((q, qIdx) => {
                if (qIdx !== questionIndex) return q;

                if (answerIndex !== undefined) {
                    const updatedAnswers = q.answers.map((a, aIdx) => {
                        if (aIdx !== answerIndex) return a;

                        return {
                            ...a,
                            [name]: value,
                        };
                    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            await axios.post("/quiz/save-translate", formData).then(({data}) => {
                console.log("Answer", data);
            });
        } catch (error) {
            console.error("Error saving quiz: ", error);
        }
    };

    const getLanguageNameById = (languageId) => {
        const language = languages.find(lang => lang.id === parseInt(languageId));
        return language ? language.name : "Unknown Language";
    };

    return (
        <SidebarLayout>
            <Head title="Quiz Translates" />
            <div className="mx-auto max-w-10xl">
                <form className="max-w-2xl mx-auto p-4 border rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="font-bold mb-5 uppercase">Translations For Quiz ID: {quiz.id}</h2>
                    <Select
                        inputs={languages}
                        label="choose translated language"
                        value={formData.language_id}
                        onChange={(e) => handleLanguageValue(e.target.value)}
                        name="language_id"
                        setDefaultValue={(value) => handleLanguageValue(value)}
                    />
                    Quiz name: {defaultQuizTranslate.name}<br/>
                    <Input
                        input="name"
                        label={"quiz name translate in " + getLanguageNameById(formData.language_id)}
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                    />
                    Quiz descriptions: {defaultQuizTranslate.description}<br/>
                    <Input
                        input="description"
                        label={"quiz description translate in " + getLanguageNameById(formData.language_id)}
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                    />
                    {formData.questions.map((question, questionIndex) => {
                        const questionTranslate = question.translations.find(
                            (translation) => translation.language_id === parseInt(defaultQuizTranslate.language_id));

                        return (
                            <div key={questionIndex} className="p-4 my-4 border rounded-lg">
                                {questionTranslate ? (
                                    "Question " + (questionIndex + 1) + ": " + questionTranslate.question

                                ) : (
                                    "Question " + (questionIndex + 1) + ": No translation available"
                                )}

                                <Input
                                    input="question"
                                    label={"quiz question translate in " + getLanguageNameById(formData.language_id)}
                                    value={question.question}
                                    onChange={(e) => handleInputChange(e, questionIndex)}
                                    name="question"
                                />
                                {question.answers.map((answer, answerIndex) => {
                                    const answerTranslate = answer.translates.find(
                                        (translation) => translation.language_id === parseInt(defaultQuizTranslate.language_id));

                                    return (
                                        <div key={answerIndex} className="mt-2">
                                            {answerTranslate ? (
                                                "Answer " + (answerIndex + 1) + ": " + answerTranslate.answer

                                            ) : (
                                                "Answer " + (answerIndex + 1) + ": No translation available"
                                            )}

                                            <Input
                                                input="answer"
                                                label={"answer translate in " + getLanguageNameById(formData.language_id)}
                                                value={answer.answer}
                                                onChange={(e) => handleInputChange(e, questionIndex, answerIndex)}
                                                name="answer"
                                            />
                                        </div>
                                )})}
                            </div>

                        )})}
                    <Button />
                </form>
            </div>
        </SidebarLayout>
    )}