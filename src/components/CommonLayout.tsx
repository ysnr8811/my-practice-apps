import React, { ReactNode } from "react";
import Link from "next/link";

// 共通レイアウトコンポーネント
// このコンポーネントは全アプリ画面で共通のデザイン（ドロワー＋メイン領域）を提供します
// children: 各ページのコンテンツ

// ドロワー（サイドメニュー）の幅
const drawerWidth = 220;

// ドロワーのスタイル定義
const drawerStyle: React.CSSProperties = {
  position: "fixed", // 画面左に固定表示
  top: 0,
  left: 0,
  width: drawerWidth, // 指定した幅
  height: "100vh", // 画面の高さいっぱい
  background: "#222", // ドロワーの背景色（濃いグレー）
  color: "#fff", // 文字色（白）
  padding: "32px 16px 16px 16px", // 上部余白多め
  boxSizing: "border-box", // パディング込みでサイズ計算
  boxShadow: "2px 0 8px rgba(0,0,0,0.1)", // 右側に薄い影
  zIndex: 1000, // 他要素より前面
  display: "flex", // 縦並び
  flexDirection: "column",
  gap: "16px" // 要素間の隙間
};

// メインコンテンツ領域のスタイル定義
const contentStyle: React.CSSProperties = {
  marginLeft: drawerWidth, // ドロワー分だけ右にずらす
  padding: "32px 24px", // 内側余白
  minHeight: "100vh", // 画面の高さいっぱい
  background: "#000" // 背景色を黒に変更
};

export default function CommonLayout({ children }: { children: ReactNode }) {
  // ドロワーの開閉状態（今は常に表示）
  // 必要ならuseStateで開閉可能にできます

  // レイアウト全体をdivでラップ
  return (
    <div>
      {/* ドロワー（サイドメニュー） */}
      <nav style={drawerStyle}>
        {/* メニュータイトル */}
        <h2 style={{marginBottom: "24px", fontSize: "1.2rem"}}>メニュー</h2>
        {/* ホーム画面へのリンク（常に表示） */}
        <Link href="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "1rem" }}>
          ホーム画面へ戻る
        </Link>
        {/* 必要なら他のリンクも追加可能（例：各アプリへのリンクなど） */}
      </nav>
      {/* メインコンテンツ領域 */}
      <main style={contentStyle}>
        {/* childrenには各アプリの内容が入る */}
        {children}
      </main>
    </div>
  );
}
