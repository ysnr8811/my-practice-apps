'use client'

import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import CharacterCounterUI from "@/app/004-counter/components/CharacterCounterUI";

export default function CounterPage() {

    return (

        <CommonLayout>

            <Suspense fallback={<div>読み込み中...</div>}>

                <CharacterCounterUI></CharacterCounterUI>

            </Suspense>

        </CommonLayout>

    );
}
