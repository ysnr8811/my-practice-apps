// useRouterのようなクライアントサイドの機能を使うために必要なディレクティブです。
"use client";

// Next.jsから画面遷移のためのuseRouterフックをインポートします。
import { useRouter } from "next/navigation";
import ItemButton from "../components/ItemButton";
import CommonLayout from "@/components/CommonLayout";

// これがホームページのメインコンポーネントです。
export default function Home() {
  // 画面遷移を扱うためにルーターオブジェクトを取得します。
  const router = useRouter();

  // 各ボタンの遷移先パスとラベル
  const buttonConfigs = [
    { label: "001-電卓アプリ", path: "/001-calc" },
    { label: "002-パスワード自動生成ツール", path: "/002-password" },
    { label: "003-おみくじアプリ", path: "/003-omikuji" },
    { label: "004-文字数・単語数カウンター", path: "/004-counter" },
    { label: "005-BMI計算ツール", path: "/005-bmi" },
    { label: "006-TODOリストアプリ", path: "/006-todo" },
    { label: "007-映画・書籍レビューサイト", path: "/007-review" },
    { label: "008-ダークモード切り替え機能付きランディングページ", path: "/008-landing" },
    { label: "009-天気情報アプリ", path: "/009-weather" },
    { label: "010-通貨換算ツール", path: "/010-currency" },
  ];

  return (
      <CommonLayout>
      <h1>Welcome to my Next.js App</h1>

      {/* ボタンを5列2行のグリッドで表示するためのコンテナ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '10px',
        maxWidth: '100vw',
        margin: '0 auto',
        width: '100%'
      }}>
        {buttonConfigs.map((config, idx) => (
          <ItemButton
            key={idx}
            item={config.label}
            onClick={() => router.push(`${config.path}?label=${encodeURIComponent(config.label)}`)}
          />
        ))}
      </div>
      </CommonLayout>
  );
}
