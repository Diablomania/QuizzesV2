import {useEffect} from "react";
import {stringify} from "postcss";

export default function Select({
    label,
    inputs = [],
    value = "",
    name = "name",
    isDisabled = false,
    onChange = () => {},
    setDefaultValue = (value) => {},
}) {
    useEffect(() => {
        if (inputs.length > 0 && !value) {
            setDefaultValue(inputs[0].id);
        }
    }, [inputs, value, setDefaultValue]);

    return (
        <div>
            { label && (
                <label htmlFor="countries" className="block mb-2 text-sm font-medium capitalize text-gray-400">
                    {label}
                </label>
            )}
            <select
                disabled={isDisabled}
                name={name}
                value={value}
                onChange={onChange}
                id={name}
                className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-400 focus:ring-blue-500 focus:border-blue-500">

                {Array.isArray(inputs) && inputs.length > 0 ? (
                    <>
                        {inputs.map((input) => (
                            <option key={input.id} value={input.id}>{input.name}</option>
                        ))}
                    </>
                ) : (
                    <option>No options</option>
                )}
            </select>
        </div>
    );
}
