'use client';

import React from 'react';

/**
 * このコンポーネントが受け取るprops（プロパティ）の型を定義します。
 * 親コンポーネントからテキストの内容(text)と、テキストが変更されたときに実行する関数(onTextChange)を受け取ります。
 */
interface InputTextBoxProps {
  text: string;
  onTextChange: (newText: string) => void;
}

/**
 * InputTextBoxコンポーネントの定義
 */
export default function InputTextBox({ text, onTextChange }: InputTextBoxProps) {
  return (
    <textarea
      // 親から渡されたテキストを表示します
      value={text}
      // テキストが変更されるたびに、親から渡されたonTextChange関数を実行して、新しいテキストを親に通知します
      onChange={(e) => onTextChange(e.target.value)}
      className="w-full h-60 p-3 bg-gray-800 text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="ここにテキストを入力してください..."
    />
  );
}
