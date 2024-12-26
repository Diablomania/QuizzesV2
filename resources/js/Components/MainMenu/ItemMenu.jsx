import React from 'react';

export default function ItemMenu({icon, label, link}) {
    return (
        <a href={link} className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
            <button className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                <svg className="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {icon}
                </svg>
                <p className="text-base leading-4">{label}</p>
            </button>
        </a>
    );
}
