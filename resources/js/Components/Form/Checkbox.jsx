export default function Checkbox({
      label,
      id = "",
      input = "text",
      value = "",
      name = "name",
      isDisabled = false,
      required = true,
      onChange = () => {},
}) {
    return (
        <div className="flex items-center mb-4">
            <input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-800 border-gray-400"
                placeholder={input}
                required={required}
                disabled={isDisabled}
            />
            { label && (<label htmlFor={input} className="ms-2 text-sm font-medium text-gray-400">{label}</label>) }
        </div>
    );
}
