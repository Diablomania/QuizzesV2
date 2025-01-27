import { Head } from '@inertiajs/react';
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import DashboardItem from "@/Pages/Profile/DashboardItem.jsx";
import {useTranslation} from "react-i18next";

export default function Leaderboard({leaderboard}) {
    const [t] = useTranslation();

    return (
        <SidebarLayout>
            <Head title={t("leaderboard.head")} />

            <div className="mx-auto max-w-10xl">
                {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                    <>
                        <div className="mt-2 relative overflow-x-auto rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                                <thead className="text-xs uppercase bg-gray-900 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        {t("leaderboard.tableId")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("leaderboard.tableName")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("leaderboard.totalScore")}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaderboard.map((result) => (
                                    <tr className="border-b bg-gray-800 border-gray-700" key={result.user_id}>
                                        <td className="px-6 py-4">
                                            {result.user_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {result.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {result.total_score}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>

                ) : (
                    <p className="text-gray-400">{t("leaderboard.noQuizResults")}</p>
                )}
            </div>
        </SidebarLayout>
    )
        ;
}
