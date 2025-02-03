export default function CloseButton({ label = "Button", onClick = () => {}, className = "" }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={"focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 bg-red-600 hover:bg-red-700 focus:ring-red-900 "+className}
        >
            {label}
        </button>
    );
}
