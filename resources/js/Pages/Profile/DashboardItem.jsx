export default function DashboardItem({icon, text, descriptionText}) {
    return (
        <div className="max-w-full rounded-lg bg-gray-800 h-fit p-5 flex-col items-center">
            <div className="flex items-center">
                {icon ??
                    (<svg className="w-12 h-12 text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                         viewBox="0 0 25 25">
                        <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                    </svg>)
                }
                <h5 className="capitalize text-2xl font-bold tracking-tight text-white line-clamp-3">
                    {text}
                </h5>
            </div>
            <div className="text-gray-400">{descriptionText}</div>
        </div>
    );
}
