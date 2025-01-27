import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import Button from "@/Components/Button.jsx";
import CloseButton from "@/Components/CloseButton.jsx";
import {Inertia} from "@inertiajs/inertia";
import axios from "axios";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";

export default function EditQuizCategories({ categories }) {
    const [t] = useTranslation();
    const addCategory = () => {
        Inertia.get(route('quizzes.category.build'));
    }

    const editCategory = (id) => {
        Inertia.get(route('quizzes.category.edit', id));
    }

    const deleteCategory = (id) => {
        Swal.fire({
            title: t("editCategories.modal.title"),
            text: t("editCategories.modal.text"),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t("editCategories.modal.confirmButtonText"),
            cancelButtonText: t("editCategories.modal.cancelButtonText"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete("/quiz/category/"+id).then(() => {
                        Swal.fire({
                            title: t("editCategories.modal.confirmModal.title"),
                            text: t("editCategories.modal.confirmModal.text"),
                            icon: 'success',
                            confirmButtonText: t("editCategories.modal.confirmModal.confirmButtonText"),
                        }).then(() => {
                            Inertia.get(route('quizzes.categories.edit'));
                        });
                    });
                } catch (error) {
                    console.error("Error updating quiz category: ", error);
                }
            }
        });
    }

    return (
        <SidebarLayout>
            <Head title={t("editCategories.head")} />

            <div className="mx-auto max-w-10xl">

                <Button className="my-2" label={t("editCategories.addNewCategoryButton")} onClick={addCategory} />

                {Array.isArray(categories) && categories.length > 0 ? (
                    <div className="relative overflow-x-auto rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs uppercase bg-gray-900 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        {t("editCategories.tableId")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("editCategories.tableName")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("editCategories.tableDescription")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("editCategories.tableActions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr className="border-b bg-gray-800 border-gray-700" key={category.id}>
                                        <td className="px-6 py-4">
                                            <a
                                                className="flex items-center h-full"
                                                href={route('quizzes.categories.show', category.id)}
                                            >
                                                {category.id}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {category.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <Button label={t("editCategories.editButton")} onClick={() => editCategory(category.id)} />
                                                <CloseButton label={t("editCategories.deleteButton")} onClick={() => deleteCategory(category.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No categories available.</p>
                )}
            </div>
        </SidebarLayout>
    );
}
