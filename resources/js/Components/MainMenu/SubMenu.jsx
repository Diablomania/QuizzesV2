import React, {useState} from 'react';

export default function SubMenu({ title, children, icon }) {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    return (
        <div className="flex flex-col justify-start items-center px-2 w-full">
            <button
                onClick={toggleMenu}
                className="focus:outline-none focus:text-indigo-400 text-left text-white flex justify-between items-center w-full py-5 space-x-14"
            >
                <svg className="fill-stroke w-1/6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {icon}
                </svg>
                <p className="text-sm justify-start items-left leading-5 uppercase" style={{ marginLeft: 0 }}>{title}</p>
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

            <div className={`flex flex-col w-full md:w-auto items-start pb-1 ${isMenuVisible ? '' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
}
