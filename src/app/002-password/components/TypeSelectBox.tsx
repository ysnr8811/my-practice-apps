'use client';

import React from 'react';

/**
 * ドロップダウンの各選択肢の型を定義します
 */
interface SelectOption {
    value: string;
    label: string;
}

/**
 * このコンポーネントが受け取るpropsの型を定義します
 */
interface TypeSelectBoxProps {
    name: string; // ドロップダウンの左に表示するラベル名
    options: SelectOption[]; // 表示する選択肢の配列
}

/**
 * 汎用的なセレクトボックス（ドロップダウン）コンポーネント
 */
export const TypeSelectBox: React.FC<TypeSelectBoxProps> = ({name, options}) => {

    return (
        <div>
            <label htmlFor={name}>{name}    </label>

            {/* 選択肢リストが渡された場合、<select>をレンダリングする */}
            {options && options.length > 0 ? (

                <select name={name}>

                    {options.map((opt) => (

                        // opt.value が実際の値、opt.label が optionタグに表示される文字列
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>

                    ))}

                </select>

            ) : (

                // 選択肢リストがない場合、nameプロパティを使ってチェックボックスなどをレンダリング
                <label>

                    <input type="checkbox" name={name}/>
                    {name}

                </label>

            )}
        </div>
    );
}
