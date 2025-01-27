import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayoutV2 from "@/Layouts/GuestLayoutV2.jsx";
import {useTranslation} from "react-i18next";
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";

export default function VerifyEmail({ status }) {
    const [t] = useTranslation();
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <SidebarLayout>
            <Head title={t("verifyEmail.head")} />

            <div className="mb-4 text-center text-gray-200">
                {t("verifyEmail.description1")}<br/>
                {t("verifyEmail.description2")}<br/>
                {t("verifyEmail.description3")}
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {t("verifyEmail.send")}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-center">
                    <PrimaryButton disabled={processing}>
                        {t("verifyEmail.resendButton")}
                    </PrimaryButton>
                </div>
            </form>
        </SidebarLayout>
);
}
