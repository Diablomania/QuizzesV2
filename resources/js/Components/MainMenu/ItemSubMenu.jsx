import React from 'react';
import {usePage} from "@inertiajs/react";

export default function ItemSubMenu({icon, label, link}) {
    const currentPath = usePage().url;
    const normalizedLink = new URL(link, window.location.origin).pathname;
    const isActive = currentPath === normalizedLink;

    return (
        <a
           href={link}
           className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${
               isActive ? 'bg-gray-700 text-white' : ''
           }`}
        >
            <button className="flex justify-start items-center space-x-6 hover:text-white ${isactive} hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">
                {icon}
                <p className="text-base leading-4">{label}</p>
            </button>
        </a>
    );
}
