"use client";
import CommonLayout from "../../components/CommonLayout";
import { useSearchParams } from "next/navigation";

export default function CurrencyPage() {
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "010-通貨換算ツール";

  return (
    <CommonLayout>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>{label}</h2>
        <p>ここは{label}の仮ページです。</p>
      </div>
    </CommonLayout>
  );
}
