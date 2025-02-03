import { Head } from '@inertiajs/react';
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import DashboardItem from "@/Pages/Profile/DashboardItem.jsx";
import {useTranslation} from "react-i18next";

export default function Dashboard({quizResults, totalBestScore, bestScoreResult}) {
    const [t] = useTranslation();

    return (
        <SidebarLayout>
            <Head title={t("dashboard.head")} />

            <div className="mx-auto max-w-10xl">
                {Array.isArray(quizResults) && quizResults.length > 0 ? (
                    <>
                        <div className="overflow-hidden sm:rounded-lg">
                            <div className="text-gray-900">
                                <div
                                    className="grid
                                            grid-cols-1
                                            sm:grid-cols-1
                                            md:grid-cols-1
                                            lg:grid-cols-2
                                            2xl:grid-cols-3
                                            2xl:grid-cols-3
                                            grid-flow-row gap-4"
                                >
                                    <DashboardItem
                                        text={t("dashboard.totalScore") + (totalBestScore ?? 0)}
                                        descriptionText={t("dashboard.totalScoreDescription")}
                                    />
                                    <DashboardItem
                                        icon={
                                            <svg className="w-12 h-12 text-white" aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
                                                <path d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                                                <path
                                                    d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z"/>
                                            </svg>

                                        }
                                        text={t("dashboard.bestQuiz") + (bestScoreResult['score'] ?? 0)}
                                        descriptionText={t("dashboard.bestQuizDescription") + bestScoreResult['quizzes']['name']}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="mt-2 relative overflow-x-auto rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                                <thead className="text-xs uppercase bg-gray-900 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        {t("dashboard.tableId")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("dashboard.tableName")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("dashboard.tableDescription")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("dashboard.tableBestScore")}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {quizResults.map((result) => (
                                    <tr className="border-b bg-gray-800 border-gray-700" key={result.id}>
                                        <td className="px-6 py-4">
                                            <a
                                                className="flex items-center h-full"
                                                href={route('quizzes.categories.show', result.id)}
                                            >
                                                {result.id}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {result.quizzes.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {result.quizzes.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {result.score}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>

                ) : (
                    <p className="text-gray-400">{t("dashboard.noQuizResults")}</p>
                )}
            </div>
        </SidebarLayout>
    )
        ;
}
