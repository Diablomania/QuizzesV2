import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import SidebarLayout from "@/Layouts/SidebarLayout.jsx";
import {useTranslation} from "react-i18next";

export default function Edit({ mustVerifyEmail, status }) {
    const [t] = useTranslation();

    return (
        <SidebarLayout>
            <Head title={t("editUser.head")} />

            <div className="py-12 sm:flex sm:items-center">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-gray-700 p-4 sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-gray-700 p-4 sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-gray-700 p-4 sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
