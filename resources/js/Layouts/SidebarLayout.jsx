import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/Components/Form/Select.jsx";
import DropdownHeaderMenu from "@/Components/DropdownHeaderMenu.jsx";
import MainMenu from "@/Components/MainMenu/MainMenu.jsx";

export default function SidebarLayout({ children }) {
    const [formData, setFormData] = useState({});
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const getLanguage = async () => {
        try {
            const response = await axios.get("/languages");
            const data = response.data;

            setData(data);
            setFormData((prev) => ({
                ...prev,
                language_id: data?.user?.settings?.languages_id || 1,
            }));
        } catch (error) {
            console.log("Error getting language:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getLanguage();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const updateLanguage = async () => {
            if (formData.language_id !== data.user.settings.languages_id) {
                try {
                    await axios.post("/language", { language_id: formData.language_id });
                    window.location.reload();
                } catch (error) {
                    console.log("Error setting language:", error);
                }
            } else {
                console.log("Language is already up-to-date. No reload needed.");
            }
        };

        updateLanguage();
    }, [formData.language_id]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex h-screen bg-gray-100">
                {isVisible && windowWidth >= 768 && (
                    <div className="hidden md:flex flex-col w-64 bg-gray-800">
                        <div className="flex items-center justify-center h-16 bg-gray-900">
                            <span className="text-white font-bold uppercase">quizzes</span>
                        </div>
                        <MainMenu />
                    </div>
                )}

                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                        <div className="flex items-center px-4">
                            <button
                                className="text-gray-500 focus:outline-none focus:text-gray-700"
                                onClick={toggleVisibility}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            <input
                                className="mx-4 w-full border rounded-md px-4 py-2"
                                type="text"
                                placeholder="Search"
                            ></input>
                        </div>

                        <div className="flex items-center justify-content-end">
                            <Select
                                inputs={data.languages ?? []}
                                value={formData.language_id || 1}
                                onChange={handleChange}
                                name="language_id"
                            />

                            <DropdownHeaderMenu />
                        </div>
                    </div>

                    <div className="p-4 w-full">
                        {isVisible && windowWidth < 768 && <MainMenu />}

                        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
