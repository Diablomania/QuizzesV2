import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import QuizCategoriesItem from "@/Components/Quizzes/QuizCategoriesItem.jsx";
import QuizCategoryItem from "@/Components/Quizzes/QuizCategoryItem.jsx";

export default function QuizCategories({ quizzes }) {
    return (
        <SidebarLayout>
            <Head title="Quizzes" />

                <div className="mx-auto max-w-10xl">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            <div
                                className="grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    md:grid-cols-2
                                    lg:grid-cols-3
                                    2xl:grid-cols-4
                                    2xl:grid-cols-5
                                    grid-flow-row gap-4"
                            >
                                {Array.isArray(quizzes) && quizzes.length > 0 ? (
                                    <>
                                        {quizzes.map((quiz) => (
                                            <QuizCategoryItem
                                                key={quiz.id}
                                                quiz={quiz}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <p className="text-gray-500">No quizzes available in this category.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </SidebarLayout>
    );
}
