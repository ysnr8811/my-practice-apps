"use client";

import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import BMICalcUI from "@/app/005-bmi/components/BMICalcUI";

export default function BmiPage() {

    return (
        <CommonLayout>
            <Suspense fallback={<div>読み込み中...</div>}>

                <BMICalcUI></BMICalcUI>

            </Suspense>
        </CommonLayout>
    );
}
