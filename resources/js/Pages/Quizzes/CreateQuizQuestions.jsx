import axios from 'axios';
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import Button from "@/Components/Button.jsx";
import Select from "@/Components/Form/Select.jsx";
import {useState} from "react";

export default function CreateQuizQuestions({ quizId, languages, quizTranslates: initialQuizTranslates }) {
    const [quizTranslates, setQuizTranslates] = useState(initialQuizTranslates);
    const [formData, setFormData] = useState({
        id: quizId,
        name: "",
        description: "",
        language_id: "",
    });

    const [forms, setForms] = useState([]);

    const addForm = () => {
        setForms((prev) => [...prev, { id: Date.now() }]);
    };

    const removeForm = (id) => {
        setForms((prev) => prev.filter((form) => form.id !== id)); // Видаляємо форму за `id`
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "language_id") {
            handleDefaultValue(value);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleDefaultValue = (languageId) => {
        const selectedTranslate = quizTranslates.find(
            (translate) => translate.language_id === parseInt(languageId)
        );

        setFormData((prev) => ({
            ...prev,
            language_id: languageId,
            name: selectedTranslate ? selectedTranslate.name : "",
            description: selectedTranslate ? selectedTranslate.description : "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/quiz/save-translate", formData).then(({data}) => {
                setQuizTranslates(
                    data.quizTranslates
                );
            });
        } catch (error) {
            console.error("Error updating quiz translates: ", error);
        }
    };

    return (
        <SidebarLayout>
            <Head title="Quiz Translates" />
            <div className="mx-auto max-w-10xl">
                <Select
                    inputs={languages}
                    label="quiz language"
                    value={formData.language_id}
                    onChange={handleChange}
                    name="language_id"
                    setDefaultValue={(value) => handleDefaultValue(value)}
                />
                <h2><b>Quiz name: {formData.name}</b></h2>
                <p>Quiz description: {formData.description}</p>
                <Button
                    onClick={addForm}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    label="Add Form"
                />

                <div className="mt-5">
                    {forms.map((form) => (
                        <div className="mt-5 p-5 border rounded shadow-md">
                            <h4 className="text-lg font-bold">Форма #{form.id}</h4>
                            <form key={form.id} onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor={`name-${form.id}`} className="block text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`name-${form.id}`}
                                        name={`name-${form.id}`}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeForm(form.id)}
                                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
}
