import {Inertia} from "@inertiajs/inertia";
import SubMenu from "@/Components/MainMenu/SubMenu.jsx";
import ItemMenu from "@/Components/MainMenu/ItemMenu.jsx";
import {Link, usePage} from "@inertiajs/react";
import ItemSubMenu from "@/Components/MainMenu/ItemSubMenu.jsx";
import Icon from "@/Components/Icon.jsx";
import {useTranslation} from "react-i18next";

export default function MainMenu() {
    const isAdmin = !!(usePage().props.auth.user.is_admin);
    const [t] = useTranslation();

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout'));
    };

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 overflow-y-auto overflow-x-hidden">

                <SubMenu
                    title={t("mainMenu.quizzes.name")}
                    icon={
                        <Icon d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                    }
                    keyName="quizzes"
                >
                    <ItemSubMenu
                        icon={
                            <Icon d="M8 18V6l8 6-8 6Z" />
                        }
                        label={t("mainMenu.quizzes.categories")}
                        link={route('quizzes.categories')}
                    />
                    <ItemSubMenu
                        icon={
                            <Icon d="M8 18V6l8 6-8 6Z" />
                        }
                        label={t("mainMenu.quizzes.leaderboard")}
                        link={route('leaderboard')}
                    />
                </SubMenu>
                {isAdmin && (
                    <SubMenu
                        title={t("mainMenu.admin.name")}
                        icon={
                            <Icon d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                        }
                        keyName="admin"
                    >
                        <ItemSubMenu
                            icon={
                                <Icon d="M8 18V6l8 6-8 6Z" />
                            }
                            label={t("mainMenu.admin.createNewQuiz")}
                            link={route('quiz.build')}
                        />
                        <ItemSubMenu
                            icon={
                                <Icon d="M8 18V6l8 6-8 6Z" />
                            }
                            label={t("mainMenu.admin.editQuizCategories")}
                            link={route('quizzes.categories.edit')}
                        />
                        <ItemSubMenu
                            icon={
                                <Icon d="M8 18V6l8 6-8 6Z" />
                            }
                            label={t("mainMenu.admin.add")}
                            link={route('quizzes.category.build')}
                        />
                    </SubMenu>
                )}

                <SubMenu
                    title={t("mainMenu.user.name")}
                    icon={
                        <Icon d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    }
                    keyName="user"
                >
                    <ItemSubMenu
                        icon={
                            <Icon d="M13 10V3L4 14h7v7l9-11h-7z" />
                        }
                        label={t("mainMenu.user.edit")}
                        link={route('profile.edit')}
                    />
                    <ItemSubMenu
                        icon={
                            <Icon d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" />
                        }
                        label={t("mainMenu.user.dashboard")}
                        link={route('dashboard')}
                    />
                </SubMenu>

                <ItemMenu
                    icon={
                        <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3" />
                    }
                    label={t("mainMenu.logOut.name")}
                    onClick={handleLogout}
                />

            </nav>
        </div>
    );
}
