import { Head } from '@inertiajs/react';
import Button from "@/Components/Button.jsx";
import GuestLayoutV2 from "@/Layouts/GuestLayoutV2.jsx";
import {useTranslation} from "react-i18next";

export default function Home() {
    const [t] = useTranslation();

    return (
        <GuestLayoutV2>
            <Head title={t("home.head")}/>
            <h1 className="text-6xl font-bold text-center text-gray-200">{t("name")}</h1>
            <div className="flex space-x-4">
                <a href={route('login')} className="p-1">
                    <Button label={t("home.login")}/>
                </a>
                <a href={route('register')} className="p-1">
                    <Button label={t("home.register")}/>
                </a>
            </div>
        </GuestLayoutV2>
    );
}
