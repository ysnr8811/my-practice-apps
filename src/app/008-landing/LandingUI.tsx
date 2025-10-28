'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// モードの型を定義します。'light' または 'dark' のみ許容します。
type Mode = 'light' | 'dark';

// ランディングページのUIコンポーネント
export default function LandingUI() {
  // URLからラベルを取得します
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "008-ランディングページ";

  // --- Stateの定義 ---
  // 現在のモード（lightかdarkか）を管理するstate。初期値は'light'。
  const [mode, setMode] = useState<Mode>('light');

  // --- イベントハンドラの定義 ---

  /**
   * モードを切り替える関数
   */
  const toggleMode = () => {
    // 現在のモードが'light'なら'dark'に、'dark'なら'light'に設定します。
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // --- スタイルの動的適用 ---
  // モードに応じて背景色と文字色を決定します。
  const containerClasses = mode === 'light'
    ? 'bg-white text-gray-800'
    : 'bg-gray-900 text-gray-100';

  const buttonClasses = mode === 'light'
    ? 'bg-gray-800 text-white'
    : 'bg-white text-gray-800';

  return (
    // `containerClasses`を適用し、モード切替時に色が滑らかに変わるようにtransitionを設定
    <div className={`min-h-screen font-sans transition-colors duration-500 ${containerClasses}`}>
      {/* ヘッダー部分 */}
      <header className="flex justify-between items-center p-4 border-b border-gray-500/20">
        <h1 className="text-xl font-bold">{label}</h1>
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${buttonClasses}`}
        >
          {mode === 'light' ? 'ダークモードへ' : 'ライトモードへ'}
        </button>
      </header>

      {/* メインコンテンツ部分 */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-5xl font-extrabold mb-4">ようこそ！</h2>
        <p className="max-w-2xl mb-8 text-lg opacity-80">
          これはNext.jsで作成された、モード切り替え機能付きのシンプルなランディングページです。
          右上のボタンをクリックして、ライトモードとダークモードを切り替えてみてください。
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 hover:scale-105">
          今すぐ始める
        </button>
      </main>

      {/* フッター部分 */}
      <footer className="text-center p-6 border-t border-gray-500/20">
        <p className="opacity-60">&copy; 2024 My Practice Apps. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
