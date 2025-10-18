"use client";

import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import OmikujiGenerateUI from "@/app/003-omikuji/components/OmikujiGenerateUI";

export default function OmikujiPage() {

  return (
    <CommonLayout>

        <Suspense fallback={<div>読み込み中...</div>}>

            <OmikujiGenerateUI />

        </Suspense>

    </CommonLayout>
  );
}
