// このファイルはクライアントサイドで動作することを示す宣言です。
// Next.jsでは、useStateやuseEffectなどのフックを使うコンポーネントにはこれが必要です。
'use client';

// Reactライブラリをインポートします。JSXを使うために必要です。
import React from 'react';

/**
 * Displayコンポーネントが受け取るprops（プロパティ）の型を定義します。
 * 'value'という名前のプロパティをstring型（文字列）として受け取ります。
 */
type DisplayProps = {
  value: string;
};

/**
 * Displayコンポーネントを定義します。
 * React.FCは、これがReactの関数コンポーネントであることを示します。
 * propsとしてvalueを受け取ります。
 */
const Display: React.FC<DisplayProps> = ({ value }) => {
  // JSXを返します。これが画面に表示される内容です。
  return (
    // Tailwind CSSを使ってスタイリングしています。
    // bg-gray-800: 背景を濃い灰色に
    // text-white: 文字色を白に
    // text-4xl: 文字サイズを大きく
    // text-right: 文字を右揃えに
    // p-4: 内側の余白を4の単位で設定
    // rounded-t-lg: 上側の角を丸くする
    <div className="bg-gray-800 text-white text-4xl text-right p-4 rounded-t-lg">
      {/* 親コンポーネントから受け取った'value'を表示します。 */}
      {/* もしvalueが空やnullの場合は、'0'を表示します。 */}
      {value || '0'}
    </div>
  );
};

// このDisplayコンポーネントを他のファイルで使えるようにエクスポートします。
export default Display;
