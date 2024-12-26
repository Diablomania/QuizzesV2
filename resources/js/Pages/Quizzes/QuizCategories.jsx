import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";

export default function QuizCategories({ categories }) {
    return (
        <SidebarLayout>
            <Head title="Quiz Categories" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Hello World! Here is quizzes categories:

                            {Array.isArray(categories) && categories.length > 0 ? (
                                <ul>
                                    {categories.map((category, index) => (
                                        <li key={index} className="py-1">
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No categories available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
