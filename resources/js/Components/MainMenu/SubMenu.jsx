import React, {useState} from 'react';
import useLocalStorage from "@/hooks/useLocalStorage";
import Icon from "@/Components/Icon.jsx";

export default function SubMenu({ title, children, icon }) {
    const [isMenuVisible, setMenuVisible] = useLocalStorage(title, false);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    return (
        <div>
            <div className="flex items-center px-4 py-2 text-gray-100 hover:text-white hover:bg-gray-700">
                <button
                    onClick={toggleMenu}
                    className="flex justify-start items-center space-x-6 text-gray-400 rounded py-2 w-full md:w-52 focus:text-white">
                    {icon}
                    <p className="text-base leading-4">{title}</p>
                    <svg
                        className={`transform transition-transform ${isMenuVisible ? 'rotate-180' : ''}  w-1/6`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 15L12 9L6 15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div className={`flex flex-col w-full md:w-auto items-start pb-1 ${isMenuVisible ? '' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
}
