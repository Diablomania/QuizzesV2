import React, { useState } from 'react';

export default function SidebarLayoutV2({ children }) {
    const [isMenu1Visible, setMenu1Visible] = useState(false);
    const [isNavVisible, setNavVisible] = useState(false);

    const toggleMenu1 = () => {
        setMenu1Visible((prev) => !prev);
    };

    const toggleNav = () => {
        setNavVisible((prev) => !prev);
    };

    return (
        <div>
            <div
                id="Main"
                className={`xl:rounded-r transform ease-in-out transition duration-500 flex justify-start items-start h-full w-full sm:w-64 bg-gray-900 flex-col`}
            >
                <div className="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full">
                    {/* Кнопка для перемикання першого меню */}
                    <button
                        onClick={toggleMenu1}
                        className="focus:outline-none focus:text-indigo-400 text-left text-white flex justify-between items-center w-full py-5 space-x-14"
                    >
                        <p className="text-sm leading-5 uppercase">Profile Overview</p>
                        <svg
                            id="icon1"
                            className={`transform transition-transform ${
                                isMenu1Visible ? 'rotate-180' : ''
                            }`}
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

                    <div className={`flex flex-col w-full md:w-auto items-start pb-1 ${isMenu1Visible ? '' : 'hidden'}`}>
                        <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                            <svg className="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-base leading-4">Messages</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
