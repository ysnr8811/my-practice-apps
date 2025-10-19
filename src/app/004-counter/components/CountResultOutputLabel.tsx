'use client';

import React from 'react';

/**
 * このコンポーネントが受け取るpropsの型を定義します。
 */
interface CountResultOutputLabelProps {
    charCount: number; // 文字数
}

/**
 * 計算結果を表示するコンポーネント
 */
export default function CountResultOutputLabel({charCount}: CountResultOutputLabelProps) {
    return (
        <div className="text-center">
            <span className="text-2xl font-bold">{charCount}</span>
        </div>
    );
}
