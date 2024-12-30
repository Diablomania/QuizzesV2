export default function Input({ label, input = "InputWithLabel" }) {
    return (
        <div className="mb-5">
            { label && (<label htmlFor={input} className="block mb-2 text-sm font-medium capitalize text-gray-100 dark:text-gray-500">{label}</label>) }
            <input type={input} id={input}
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                   placeholder={input} required/>
        </div>
    );
}
