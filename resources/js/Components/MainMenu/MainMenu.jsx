import {Inertia} from "@inertiajs/inertia";
import SubMenu from "@/Components/MainMenu/SubMenu.jsx";
import ItemMenu from "@/Components/MainMenu/ItemMenu.jsx";
import {Link} from "@inertiajs/react";
import ItemSubMenu from "@/Components/MainMenu/ItemSubMenu.jsx";
import Icon from "@/Components/Icon.jsx";

export default function MainMenu() {

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout'));
    };

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 overflow-y-auto overflow-x-hidden">

                <SubMenu
                    title={"Quizzes"}
                    icon={
                        <Icon d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                    }
                >
                    <ItemSubMenu
                        icon={
                            <Icon d="M8 18V6l8 6-8 6Z" />
                        }
                        label={"Quiz categories"}
                        link={route('quizzes.categories')}
                    />
                    <ItemSubMenu
                        icon={
                            <Icon d="M8 18V6l8 6-8 6Z" />
                        }
                        label={"Create new quiz"}
                        link={route('quiz.build')}
                    />
                    <ItemSubMenu
                        icon={
                            <Icon d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" />
                        }
                        label={"Delete"}
                    />
                </SubMenu>

                <ItemMenu
                    icon={
                        <Icon d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" />
                    }
                    label={"Dashboard"}
                    link={route('dashboard')}
                />

                <ItemMenu
                    icon={
                        <Icon d="M13 10V3L4 14h7v7l9-11h-7z" />
                    }
                    label={"Hello"}
                    link={route('hello')}
                />

                <ItemMenu
                    icon={
                        <Icon d="M13 10V3L4 14h7v7l9-11h-7z" />
                    }
                    label={"Profile"}
                    link={route('profile.edit')}
                />

                <SubMenu
                    title={"User"}
                    icon={
                        <Icon d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    }
                >
                    <ItemSubMenu
                        icon={
                            <Icon d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" />
                        }
                        label={"Edit"}
                    />
                    <ItemSubMenu
                        icon={
                            <Icon d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" />
                        }
                        label={"Delete"}
                    />
                </SubMenu>

                <ItemMenu
                    icon={
                        <Icon d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3" />
                    }
                    label={"Log OUT"}
                    onClick={handleLogout}
                />

            </nav>
        </div>
    );
}
