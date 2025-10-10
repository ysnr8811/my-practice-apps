"use client";
import CommonLayout from "../../components/CommonLayout";
import { useSearchParams } from "next/navigation";

export default function CounterPage() {
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "004-文字数・単語数カウンター";

  return (
    <CommonLayout>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>{label}</h2>
        <p>ここは{label}の仮ページです。</p>
      </div>
    </CommonLayout>
  );
}
