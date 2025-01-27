import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import GuestLayoutV2 from "@/Layouts/GuestLayoutV2.jsx";
import {useTranslation} from "react-i18next";
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";

export default function ConfirmPassword() {
    const [t] = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <SidebarLayout>
            <Head title={t("confirmPassword.head")} />

            <div className="mb-4 text-sm text-gray-200">
                {t("confirmPassword.description")}
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value={t("confirmPassword.password")} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-gray-600"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {t("confirmPassword.confirmButton")}
                    </PrimaryButton>
                </div>
            </form>
        </SidebarLayout>
    );
}
