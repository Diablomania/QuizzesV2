import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import QuizCategoriesItem from "@/Components/Quizzes/QuizCategoriesItem.jsx";

export default function QuizCategories({ categories }) {
    return (
        <SidebarLayout>
            <Head title="Quiz Categories" />

                <div className="mx-auto max-w-10xl">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
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
                                {Array.isArray(categories) && categories.length > 0 ? (
                                    <>
                                        {categories.map((category) => (
                                            <QuizCategoriesItem
                                                key={category.id}
                                                category={category}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <p className="text-gray-400">No categories available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </SidebarLayout>
    );
}
