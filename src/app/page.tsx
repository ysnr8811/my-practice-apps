// useRouterのようなクライアントサイドの機能を使うために必要なディレクティブです。
"use client";

// 必要なモジュールやコンポーネントをインポートします。
import { useRouter } from "next/navigation";
import React from "react"; // React本体（JSXとCSSProperties型のために必要）
import ItemButton from "../components/ItemButton";
import CommonLayout from "@/components/CommonLayout";

// ボタンの設定オブジェクトの型を定義します。
// これにより、各ボタンが必ずstring型のlabelとpathを持つことが保証されます。
type ButtonConfig = {
  label: string;
  path: string;
};

// これがホームページのメインコンポーネントです。
export default function Home() {
  // 画面遷移を扱うためにルーターオブジェクトを取得します。
  const router = useRouter();

  // 各ボタンの設定を、上で定義したButtonConfig型の配列として定義します。
  const buttonConfigs: ButtonConfig[] = [
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

  // ボタンを配置するグリッドのスタイルを定義します。
  // React.CSSProperties型を適用することで、CSSプロパティのタイポなどを防ぎます。
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // 5列のグリッド
    gridTemplateRows: 'repeat(2, 1fr)',    // 2行のグリッド
    gap: '10px', // グリッドアイテム間の隙間
    maxWidth: '100vw',
    margin: '0 auto',
    width: '100%'
  };

  return (
      <CommonLayout>
        <h1>Welcome to my Next.js App</h1>

        {/* ボタンをグリッドで表示するためのコンテナ */}
        <div style={gridStyle}>
          {/* buttonConfigs配列をループして、各設定に対応するボタンを生成します。 */}
          {buttonConfigs.map((config, idx) => (
            <ItemButton
              key={idx} // Reactがリストの各要素を識別するためのキー
              item={config.label}
              // ボタンクリックで、設定されたパスにクエリパラメータを付けて画面遷移します。
              onClick={() => router.push(`${config.path}?label=${encodeURIComponent(config.label)}`)}
            />
          ))}
        </div>
      </CommonLayout>
  );
}
