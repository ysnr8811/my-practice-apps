// useRouterのようなクライアントサイドの機能を使うために必要なディレクティブです。
"use client";

// Next.jsから画面遷移のためのuseRouterフックをインポートします。
import { useRouter } from "next/navigation";
import ItemButton from "../components/ItemButton";

// これがホームページのメインコンポーネントです。
export default function Home() {
  // 画面遷移を扱うためにルーターオブジェクトを取得します。
  const router = useRouter();

  // 各ボタンの遷移先パスとラベル
  const buttonConfigs = [
    { label: "電卓アプリ", path: "/calc" },
    { label: "パスワード自動生成ツール", path: "/password" },
    { label: "TODOリストアプリ", path: "/todo" },
    { label: "文字数・単語数カウンター", path: "/counter" },
    { label: "BMI計算ツール", path: "/bmi" },
    { label: "未定", path: "/unknown" },
    { label: "映画・書籍レビューサイト", path: "/review" },
    { label: "ダークモード切り替え機能付きランディングページ", path: "/landing" },
    { label: "天気情報アプリ", path: "/weather" },
    { label: "通貨換算ツール", path: "/currency" },
  ];

  return (
    // インラインスタイルを使って、このdivとその子要素のテキストコンテンツを中央揃えにします。
    <div style={{ textAlign: "center" }}>
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
          <ItemButton key={idx} item={config.label} onClick={() => router.push(config.path)} />
        ))}
      </div>
    </div>
  );
}
