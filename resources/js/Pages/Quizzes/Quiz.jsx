import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import QuizCategoriesItem from "@/Components/Quizzes/QuizCategoriesItem.jsx";
import {useState} from "react";

export default function QuizCategories({ quiz }) {
    const [imgSrc, setImgSrc] = useState(quiz.img_url);

    const handleError = () => {
        setImgSrc("/images/default.jpg");
    };

    return (
        <SidebarLayout>
            <Head title="Quiz: ${quiz.name}" />

                <div className="mx-auto max-w-10xl">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            <h1>{quiz.id}{quiz.name}</h1>
                            <img className="rounded-t-lg w-full h-40 sm:h-60 lg:h-80 object-cover"
                                 src={imgSrc}
                                 alt=""
                                 onError={handleError}
                            />
                        </div>
                    </div>
                </div>
        </SidebarLayout>
    );
}
