"use client";
import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import ReviewUI from "@/app/007-review/ReviewUI";

export default function ReviewPage() {

  return (
      <CommonLayout>
          <Suspense fallback={<div>読み込み中...</div>}>

              <ReviewUI></ReviewUI>

          </Suspense>
      </CommonLayout>
  );
}
