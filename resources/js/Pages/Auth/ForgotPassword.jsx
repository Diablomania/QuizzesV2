import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import GuestLayoutV2 from "@/Layouts/GuestLayoutV2.jsx";
import {useTranslation} from "react-i18next";

export default function ForgotPassword({ status }) {
    const [t] = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayoutV2>
            <Head title={t("forgot.head")} />

            <div className="w-[50%] mb-4 text-gray-200 text-center">
                {t("forgot.description1")}<br/>
                {t("forgot.description2")}<br/>
                {t("forgot.description3")}
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full text-gray-600"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
                <Link
                    href={route('login')}
                    className="rounded-md text-sm text-gray-200 underline hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {t("forgot.remember")}
                </Link>

                <div className="mt-4 flex items-center justify-start">
                    <PrimaryButton disabled={processing}>
                        {t("forgot.resetButton")}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayoutV2>
    );
}
