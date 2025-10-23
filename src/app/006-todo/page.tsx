"use client";
import CommonLayout from "../../components/CommonLayout";
import { useSearchParams } from "next/navigation";
import {Suspense} from "react";
import ToDoUI from "@/app/006-todo/ToDoUI";

export default function TodoPage() {
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "006-TODOリストアプリ";

  return (
      <CommonLayout>

          <Suspense fallback={<div>読み込み中...</div>}>

            <ToDoUI></ToDoUI>

          </Suspense>

      </CommonLayout>
  );
}
