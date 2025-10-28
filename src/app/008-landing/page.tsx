"use client";
import CommonLayout from "../../components/CommonLayout";
import {useSearchParams} from "next/navigation";
import {Suspense} from "react";
import LandingUI from "@/app/008-landing/LandingUI";

export default function LandingPage() {
    const searchParams = useSearchParams();

    return (
        <CommonLayout>
            <Suspense fallback={<div>読み込み中...</div>}>

                <LandingUI></LandingUI>

            </Suspense>
        </CommonLayout>
    );
}
