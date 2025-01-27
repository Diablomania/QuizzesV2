import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head, usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import Button from "@/Components/Button.jsx";
import FormButton from "@/Components/Form/Button.jsx";
import CloseButton from "@/Components/CloseButton.jsx";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";
import Checkbox from "@/Components/Form/Checkbox.jsx";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";

export default function QuizCategories({ quiz, user }) {
    const isAdmin = !!(usePage().props.auth.user.is_admin) ?? false;
    const [t] = useTranslation();
    const userLanguage = navigator.language || navigator.languages[0];
    const [imgSrc, setImgSrc] = useState(quiz.img_url);
    const countQuestions = quiz.questions.length;
    const [isStart, setIsStart] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState({
        score: 0,
        is_best: false,
    });
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const isTranslates = !!quiz.translations && Array.isArray(quiz.translations) && quiz.translations.length > 0;

    const startAgain = () => {
        setIsComplete(false);
        setAnswers([]);
        setResult({
            score: 0,
            is_best: false,
        });
        setCurrentQuestion(0);
    }

    const nextQuestion = async () => {
        if (countQuestions == (currentQuestion+1)) {
            setIsComplete(true);
        } else {
            setCurrentQuestion((prev) => prev+1);
        }
    };

    useEffect(() => {
        const submitQuiz = async () => {
            if (isComplete && answers.length > 0) {
                try {
                    const { data } = await axios.post("/quiz/submit", answers);
                    setResult({
                        score: data['score'],
                        is_best: data['is_best'],
                        is_max: data['score'] == countQuestions,
                    });
                    setAnswers([]);
                } catch (error) {
                    console.error("Error submitting quiz: ", error);
                }
            }
        };

        submitQuiz();
    }, [isComplete]);

    const handleError = () => {
        setImgSrc("/images/default.jpg");
    };

    const deleteQuiz = async (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: t("quiz.modal.title"),
            text: t("quiz.modal.text"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t("quiz.modal.confirmButtonText"),
            cancelButtonText: t("quiz.modal.cancelButtonText"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/quiz/${id}`).then(() => {
                        Swal.fire({
                            title: t("quiz.modal.confirmModal.title"),
                            text: t("quiz.modal.confirmModal.text"),
                            icon: 'success',
                            confirmButtonText: t("quiz.modal.confirmModal.confirmButtonText"),
                        }).then(() => {
                            Inertia.visit(route('quiz.build'));
                        });
                    });
                } catch (error) {
                    console.error('Error deleting quiz:', error);
                    Swal.fire({
                        title: t("quiz.modal.error.title"),
                        text: t("quiz.modal.error.text"),
                        icon: 'error',
                        confirmButtonText: t("quiz.modal.error.confirmButtonText"),
                    });
                }
            }
        });
    };

    const handleSubmit = async (e, question_id) => {
        e.preventDefault();

        const newAnswers = {};
        let atLeastOneChecked = false;

        Array.from(e.target.answer).forEach((answ, idx) => {
            newAnswers[idx] = {
                answer_id: answ.id,
                answer: answ.checked,
            };
            if (answ.checked) {
                atLeastOneChecked = true;
            }
        });

        if (!atLeastOneChecked) {
            Swal.fire({
                title: t("quiz.answerModal.title"),
                text: t("quiz.answerModal.text"),
                icon: 'warning',
                confirmButtonText: t("quiz.answerModal.confirmButtonText"),
            });
            return;
        }

        setAnswers((prev) => [
            ...prev,
            {
                question_id: question_id,
                answers: newAnswers,
            },
        ]);

        nextQuestion();
        e.target.reset();
    };

    return (
        <SidebarLayout>
            <Head title={"Quiz: "+quiz.name} />

            <div className="mx-auto max-w-10xl overflow-hidden sm:rounded-lg text-gray-900 mx-auto max-w-2xl">
                {!isTranslates ? (
                    <p className="text-gray-200">{t("quiz.noTranslation")}</p>
                ) : (
                    !isStart ? (
                        <>
                            <h3 className="uppercase font-bold p-1 text-gray-200">{quiz.name}</h3>
                            <p className="p-1 text-gray-400">{quiz.description}</p>
                            <img
                                className="rounded-lg w-full h-40 sm:h-60 lg:h-80 object-cover p-1"
                                src={imgSrc}
                                alt=""
                                onError={handleError}
                            />
                            <div className={"flex justify-between"}>
                                {isAdmin && (<a href={route('quiz.manage-translate', {id: quiz.id})} className="p-1">
                                    <Button label={t("quiz.addTranslateButton")}/>
                                </a>)}
                                {isAdmin && (<a href={route('quiz.build')} className="p-1">
                                    <Button label={t("quiz.addNewQuizButton")} />
                                </a>)}
                                {isAdmin && (<a href={route('quiz.edit', { id: quiz.id })} className="p-1">
                                    <Button label={t("quiz.editQuizButton")} />
                                </a>)}
                                <Button
                                    label={t("quiz.startQuizButton")}
                                    onClick={() => setIsStart(!isStart)}
                                />
                                {isAdmin && (<CloseButton
                                    label={t("quiz.deleteQuizButton")}
                                    onClick={(e) => deleteQuiz(e, quiz.id)}
                                />)}
                            </div>
                        </>
                    ) : (
                        !isComplete ? (
                            <form className="max-w-2xl mx-auto p-4 rounded-lg"
                                  onSubmit={(e) => handleSubmit(e, quiz.questions[currentQuestion].id)}>
                                <h3 className="uppercase font-bold p-1 text-gray-200">{quiz.name}</h3>
                                <p className="text-gray-400">{quiz.questions[currentQuestion].translations[0]?.question || "No question available"}</p>
                                {quiz.questions[currentQuestion].img_url && (
                                    <img
                                        className="rounded-lg h-40 sm:h-60 lg:h-80 p-1"
                                        src={quiz.questions[currentQuestion].img_url}
                                        alt=""
                                        onError={handleError}
                                    />
                                )}
                                {quiz.questions[currentQuestion].answers.map((answer, aIdx) => (
                                    <Checkbox
                                        key={aIdx}
                                        id={answer.id}
                                        input="answer"
                                        value={answer.translates[0]?.answer}
                                        name="answer"
                                        label={answer.translates[0]?.answer || "No answer available"}
                                        required={false}
                                    />
                                ))}
                                <FormButton label={t("quiz.nextButton")} />
                            </form>
                        ) : (
                            <>
                                <h4 className="text-gray-200">{t("quiz.complete")}</h4>
                                <p className="text-gray-400">{t("quiz.score")+result['score']}</p>
                                {result['is_best'] ? (
                                    <p className="text-gray-400">{t("quiz.bestResult")}</p>) : ""}
                                {result['is_max'] ? (
                                    <p className="text-gray-400">{t("quiz.maxResult")}</p>) : ""}
                                <Button label={t("quiz.again")} onClick={startAgain}/>
                            </>
                        )
                    )
                )}
            </div>
        </SidebarLayout>
    );
}
