import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import {useState} from "react";
import Button from "@/Components/Button.jsx";
import CloseButton from "@/Components/CloseButton.jsx";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

export default function QuizCategories({ quiz, user }) {
    console.log("Quiz: ", quiz);
    console.log("User: ", user);

    const userLanguage = navigator.language || navigator.languages[0];
    const [imgSrc, setImgSrc] = useState(quiz.img_url);
    const countQuestions = quiz.questions.length;
    const [isStart, setIsStart] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const isTranslates = !!quiz.translations && Array.isArray(quiz.translations) && quiz.translations.length > 0;

    const nextQuestion = () => {
        if (countQuestions == (currentQuestion+1)) {
            setIsComplete(true);
        } else {
            setCurrentQuestion((prev) => prev+1);
        }
    };

    const handleError = () => {
        setImgSrc("/images/default.jpg");
    };

    const deleteQuiz = async (e, id) => {
        e.preventDefault();

        try {
            await axios.delete("/quiz/"+id).then(({data}) => {
                Inertia.visit(route('quiz.build'));
            });
        } catch (error) {
            console.error("Error deleting quiz: ", error);
        }
    }

    return (
        <SidebarLayout>
            <Head title="Quiz: ${quiz.name}" />

            <div className="mx-auto max-w-10xl">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="text-gray-900">
                        <div className="mx-auto max-w-2xl">
                            {!isTranslates && (<p>No translates</p>)}
                            {!isStart ?
                                (
                                    <>
                                        <h3 className="uppercase font-bold p-1">{quiz.name}</h3>
                                        <p className="p-1">{quiz.description}</p>
                                        <img className="rounded-lg w-full h-40 sm:h-60 lg:h-80 object-cover p-1"
                                             src={imgSrc}
                                             alt=""
                                             onError={handleError}
                                        />
                                        <div className="flex justify-between">
                                            <a href={route('quiz.manage-translate', {id: quiz.id})} className="p-1">
                                                <Button label="Add Translates"/>
                                            </a>
                                            <a href={route('quiz.build')} className="p-1">
                                                <Button label="Add New Quiz"/>
                                            </a>
                                            <a href={route('quiz.edit', {id: quiz.id})} className="p-1">
                                                <Button label="Edit Quiz"/>
                                            </a>
                                            <Button label="Start Quiz" onClick={() => {isStart ? setIsStart(false) : setIsStart(true)}}/>
                                            <CloseButton label="Delete Quiz" onClick={(e) => deleteQuiz(e, quiz.id)}/>
                                        </div>
                                    </>
                                ) : !isComplete ? (
                                    <>
                                        <h3 className="uppercase font-bold p-1">{quiz.name}</h3>
                                        <div>Current Question: {currentQuestion+1}</div>
                                        <p>{quiz.questions[currentQuestion].translations[0].question}</p>
                                        <img className="rounded-lg h-40 sm:h-60 lg:h-80 p-1"
                                             src={quiz.questions[currentQuestion].img_url}
                                             alt=""
                                             onError={handleError}
                                        />
                                        {quiz.questions[currentQuestion].answers.map((answer, aIdx) => {
                                                return (
                                                    <p key={aIdx}>{answer.translates[0].answer}</p>
                                                )
                                            }
                                        )}
                                        <Button label="Next Question" onClick={nextQuestion}/>
                                        <Button label={isStart ? "End Quiz" : "Start Quiz"} onClick={() => {
                                            isStart ? setIsStart(false) : setIsStart(true)
                                        }}/>
                                    </>
                                ) : (
                                    <h4>Quiz Complete</h4>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
