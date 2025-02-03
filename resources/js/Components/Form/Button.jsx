export default function Button({ label = "Submit" }) {
    return (
        <button
            type="submit"
            className="text-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 hover:bg-blue-700 focus:ring-blue-800"
        >
            {label}
        </button>
    );
}
