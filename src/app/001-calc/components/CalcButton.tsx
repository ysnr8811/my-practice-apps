// このファイルはクライアントサイドで動作することを示す宣言です。
'use client';

// Reactライブラリをインポートします。
import React from 'react';

// CalcButtonコンポーネントが受け取るprops（プロパティ）の型を定義します。
type ButtonProps = {
  // ボタンに表示されるテキスト（例: '1', '+'）
  label: string;
  // ボタンがクリックされたときに実行される関数。ボタンのラベルを引数として受け取ります。
  onClick: (label: string) => void;
  // 親コンポーネントから追加のCSSクラスを受け取るためのオプショナルな（あってもなくても良い）プロパティ。
  className?: string;
};

// CalcButtonコンポーネントを定義します。
// propsとして label, onClick, className を受け取ります。
const CalcButton: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  // button要素を返します。
  return (
    <button
      // ボタンがクリックされたら、親から渡されたonClick関数を、このボタンのlabelを引数にして実行します。
      onClick={() => onClick(label)}
      // Tailwind CSSを使ってスタイリングしています。
      // ``（バッククォート）で囲むことで、文字列内に変数を埋め込めます（テンプレートリテラル）。
      // bg-gray-200: 背景を灰色に
      // hover:bg-gray-300: マウスカーソルが乗った時に背景を少し濃い灰色に
      // text-2xl: 文字サイズを大きめに
      // font-bold: 文字を太字に
      // py-4: 上下の内側余白を4の単位で設定
      // rounded-lg: 角を丸くする
      // ${className}: 親コンポーネントから渡された追加のクラスをここに適用します。
      className={`bg-gray-200 hover:bg-gray-300 text-2xl font-bold py-4 rounded-lg ${className}`}
    >
      {/* ボタンのラベル（数字や記号）を表示します。 */}
      {label}
    </button>
  );
};

// このCalcButtonコンポーネントを他のファイルで使えるようにエクスポートします。
export default CalcButton;
