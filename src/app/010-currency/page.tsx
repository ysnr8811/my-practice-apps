"use client";
import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import CurrencyUI from "@/app/010-currency/CurrencyUI";

export default function CurrencyPage() {

  return (
      <CommonLayout>
          <Suspense fallback={<div>読み込み中...</div>}>

              <CurrencyUI></CurrencyUI>

          </Suspense>
      </CommonLayout>
  );
}
