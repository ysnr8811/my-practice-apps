"use client";
import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import WeatherUI from "@/app/009-weather/WeatherUI";

export default function WeatherPage() {

  return (
      <CommonLayout>
          <Suspense fallback={<div>読み込み中...</div>}>

              <WeatherUI></WeatherUI>

          </Suspense>
      </CommonLayout>
  );
}
