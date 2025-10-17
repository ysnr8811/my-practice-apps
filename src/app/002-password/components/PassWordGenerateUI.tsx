// このコンポーネントがクライアントサイドで動作することを示します。
'use client';

import { useSearchParams } from 'next/navigation';
import ItemButton from "@/components/ItemButton";
import PassWordOutputLabel from "@/app/002-password/components/PassWordOutputLabel";

// このコンポーネントはpropsを受け取らないように変更します。
export default function PassWordGenerateUI() {
    // useSearchParamsフックを使って、URLから直接クエリパラメータを取得します。
    const searchParams = useSearchParams();
    const label = searchParams.get("label") || "002-パスワード自動生成ツール";

    /**
     * 「パスワード作成」ボタンがクリックされたときの処理
     * 現時点ではコンソールにメッセージを表示するだけです。
     */
    const handleGeneratePassword = () => {
        console.log('パスワードを生成します。');


    };

    return (
        <div className="w-full mx-auto">
            <h1>{label}</h1>

            <br/>

            <PassWordOutputLabel></PassWordOutputLabel>

            <br/>

            <ItemButton item={'パスワード作成'} onClick={handleGeneratePassword}></ItemButton>
        </div>
    );
}
