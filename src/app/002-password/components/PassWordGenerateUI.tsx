// このコンポーネントがクライアントサイドで動作することを示します。
'use client';

import {useSearchParams} from 'next/navigation';
import ItemButton from "@/components/ItemButton";
import PassWordOutputLabel from "@/app/002-password/components/PassWordOutputLabel";
import {JSX, useState} from 'react'; // 状態管理のためにuseStateをインポート

/**
 * 簡易的なランダムなパスワード生成関数
 * 実際の実装では、選択されたオプションに基づいた複雑なロジックが必要です。
 * @returns 10桁のランダムな文字列
 */
const generatePassword = (): string => {
    const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    let password: string = '';

    for (let i = 0; i < 20; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

export default function PassWordGenerateUI(): JSX.Element {
    /**
     * パスワードの文字列を保持するための状態を定義
     */
    const [generatedPassword, setGeneratedPassword] = useState('');

    /**
     * URLパラメーターを取得するためのフック
     */
    const searchParams = useSearchParams();

    /**
     * URLパラメーターから取得したラベルに表示する値を取得
     */
    const label: string = searchParams.get("label") || "002-パスワード自動生成ツール";

    /**
     * 「パスワード作成」ボタンがクリックされたときの処理
     * 状態を更新することで、その値を参照している子コンポーネントも再描画されます。
     */
    const handleGeneratePassword = (): void => {
        const newPassword: string = generatePassword();
        console.log('生成されたパスワード:', newPassword);

        setGeneratedPassword(newPassword);
    };

    return (
        <div className="w-full mx-auto">
            <h1>{label}</h1>

            <br/>

            <PassWordOutputLabel password={generatedPassword}/>

            <br/>

            {/* ItemButtonがクリックされたら、handleGeneratePasswordを実行する */}
            <ItemButton item={'パスワード作成'} onClick={handleGeneratePassword}></ItemButton>
        </div>
    );
}
