import {useState} from "react";

export default function QuizCategoryItem({quiz}) {
    const [imgSrc, setImgSrc] = useState(quiz.img_url);

    const handleError = () => {
        setImgSrc("/images/default.jpg");
    };

    const getQuiz = (quizId) => {
        window.location.href = `/quiz/${quizId}`;
    };

    return (
        <div
            className="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 h-fit">
            <a onClick={() => getQuiz(quiz.id)} href="#">
                <img className="rounded-t-lg w-full h-40 sm:h-60 lg:h-80 object-cover"
                     src={imgSrc}
                     alt=""
                     onError={handleError}
                />
                <div className="p-5 flex-grow">
                    <h5 className="capitalize mb-2 text-2xl font-bold tracking-tight text-white line-clamp-1">{quiz.name}</h5>
                    <p className="mb-3 font-normal text-gray-400 line-clamp-3 h-[4.5rem]">{quiz.description ?? ""}</p>
                </div>
            </a>
        </div>
    );
}
