import React, { useState } from "react";

/**
 * ItemButtonコンポーネントのprops型定義
 * item: ボタンに表示するテキスト
 * onClick: ボタン押下時のコールバック
 */
type ItemButtonProps = {
    item: string;
    onClick: (item: string) => void;
};

export default function ItemButton({ item, onClick }: ItemButtonProps) {
  // ボタンがクリックされたかどうかの状態管理
  const [isClicked, setIsClicked] = useState(false);

  // クリック時の処理
  const handleClick = () => {
    setIsClicked(true); // クリック状態にする
    onClick(item);      // 親から渡されたonClickを実行
    setTimeout(() => setIsClicked(false), 150); // 150ms後に元に戻す
  };

  return (
    <button
      // ボタンのスタイル定義
      style={{
        transition: "transform 0.15s, background 0.15s, color 0.15s", // アニメーション
        transform: isClicked ? "scale(0.95)" : "scale(1)", // クリック時に縮小
        background: isClicked ? "#333" : "#000", // ボタンの中身：黒
        border: "2px solid #fff", // 枠線：白
        borderRadius: "6px", // 角丸
        padding: "12px 0", // 上下余白
        fontSize: "1rem", // 文字サイズ
        cursor: "pointer", // カーソル
        color: "#fff", // 文字色：白
        fontWeight: "bold", // 太字
      }}
      onClick={handleClick}
    >
      {item}
    </button>
  );
}
