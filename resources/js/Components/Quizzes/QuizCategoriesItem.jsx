import {useState} from "react";

export default function QuizCategoriesItem({category}) {
    const [imgSrc, setImgSrc] = useState(category.img_url);

    const handleError = () => {
        setImgSrc("/images/default.jpg");
    };

    const getCategory = (categoryId) => {
        window.location.href = `/quiz/categories/${categoryId}`;
    };

    return (
        <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit">
            <a onClick={() => getCategory(category.id)} href="#">
                <img className="rounded-t-lg w-full h-40 sm:h-60 lg:h-80 object-cover"
                     src={imgSrc}
                     alt=""
                     onError={handleError}
                />
                <div className="p-5 flex-grow">
                    <h5 className="capitalize mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{category.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 h-[4.5rem]">{category.description ?? ""}</p>
                </div>
            </a>
        </div>
    );
}
