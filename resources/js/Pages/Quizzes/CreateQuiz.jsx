import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {Head} from "@inertiajs/react";
import Input from "@/Components/Form/Input.jsx";
import Button from "@/Components/Form/Button.jsx";
import Select from "@/Components/Form/Select.jsx";

export default function CreateQuiz({ categories }) {
    return (
        <SidebarLayout>
            <Head title="Create Quiz" />
            <div className="mx-auto max-w-10xl">

                <form className="max-w-sm mx-auto">
                    <Input input="category_id" label="your category id" />
                    <Input input="img_url" />
                    <Select inputs={categories} />
                    <Button label="Save Quiz" />
                </form>

            </div>
        </SidebarLayout>
    );
}
