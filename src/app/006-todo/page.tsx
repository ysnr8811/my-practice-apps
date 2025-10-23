"use client";
import CommonLayout from "../../components/CommonLayout";
import {Suspense} from "react";
import ToDoUI from "@/app/006-todo/ToDoUI";

export default function TodoPage() {

  return (
      <CommonLayout>

          <Suspense fallback={<div>読み込み中...</div>}>

            <ToDoUI></ToDoUI>

          </Suspense>

      </CommonLayout>
  );
}
