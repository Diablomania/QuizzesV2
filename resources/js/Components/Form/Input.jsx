import {useEffect} from "react";

export default function Input({
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
        <div className="mb-5">
            { label && (<label htmlFor={input} className="block mb-2 text-sm font-medium capitalize text-gray-400">{label}</label>) }
            <input
                type={input}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                placeholder={input}
                required={required}
                disabled={isDisabled}
            />
        </div>
    );
}
