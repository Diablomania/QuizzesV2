export default function Button({ label = "Button", onClick = () => {}, className = "" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={"focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-blue-700 hover:bg-blue-700 focus:ring-blue-800 "+className}
        >
            {label}
        </button>
    );
}
