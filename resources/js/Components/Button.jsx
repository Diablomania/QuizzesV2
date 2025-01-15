export default function Button({ label = "Button", onClick = () => {} }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-gray-100 bg-blue-700 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            {label}
        </button>
    );
}
