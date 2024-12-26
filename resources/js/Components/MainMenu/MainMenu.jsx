import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import SubMenu from "@/Components/MainMenu/SubMenu.jsx";
import ItemMenu from "@/Components/MainMenu/ItemMenu.jsx";

export default function MainMenu() {
    const [isMenu1Visible, setMenu1Visible] = useState(false);

    const toggleMenu1 = () => {
        setMenu1Visible((prev) => !prev);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout'));
    };

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800">

                <SubMenu title={"Quizzes"} icon={
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                } >
                    <ItemMenu
                        icon={
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 18V6l8 6-8 6Z"/>
                        }
                        label={"Take a quiz"}
                        link={route('quizzes.categories')}
                    />
                    <ItemMenu icon={
                        <path
                            d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    } label={"Delete"} />
                </SubMenu>


                <a href={route('dashboard')} className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Dashboard
                </a>
                <a href={route('hello')} className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Hello
                </a>
                <a href={route('profile.edit')} className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Profile
                </a>

                <SubMenu title={"User"} icon={
                    <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                } >
                    <ItemMenu icon={
                        <path
                            d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    } label={"Edit"} />
                    <ItemMenu icon={
                        <path
                            d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    } label={"Delete"} />
                </SubMenu>

                <SubMenu title={"User"} icon={
                    <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                } >
                    <ItemMenu icon={
                        <path
                            d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    } label={"Edit"} />
                    <ItemMenu icon={
                        <path
                            d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    } label={"Delete"} />
                </SubMenu>

                <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3" />
                    </svg>
                    Log OUT
                </a>

            </nav>
        </div>
    );
}
