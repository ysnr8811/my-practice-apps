// このコンポーネントがクライアントサイドで動作することを示します。
'use client';

import { useSearchParams } from 'next/navigation';
import ItemButton from "@/components/ItemButton";
import { TypeSelectBox } from "@/app/002-password/components/TypeSelectBox";
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
        // ここに実際のパスワード生成ロジックを追加していきます。
    };

    /**
     * 英語のセレクトボックスの選択肢
     */
    const englishOptions = [
        {value: 'lower', label: '小文字 (a-z)'},
        {value: 'upper', label: '大文字 (A-Z)'},
        {value: 'both', label: '両方'},
    ];

    /**
     * 数字のセレクトボックスの選択肢
     */
    const numberOptions = [
        {value: 'none', label: '含めない'},
        {value: 'include', label: '含める (0-9)'}
    ]

    /**
     * 記号のセレクトボックスの選択肢
     */
    const symbolOptions = [
        {value: 'none', label: '含めない'},
        {value: 'include', label: '含める (!@#$%) '}
    ];

    return (
        <div className="w-full mx-auto">
            <h1>{label}</h1>

            <br/>

            <PassWordOutputLabel></PassWordOutputLabel>

            <br/>

            <fieldset className={'border-2 border-gray-300 rounded-md p-4'}>
                <legend>パスワードに利用する文字列の種類を選択してください</legend>

                {/* 修正したTypeSelectBoxコンポーネントを使用 */}
                <TypeSelectBox name={'英語'} options={englishOptions}></TypeSelectBox>
                <TypeSelectBox name={'数字'} options={numberOptions}></TypeSelectBox>
                <TypeSelectBox name={'記号'} options={symbolOptions}></TypeSelectBox>

            </fieldset>

            <br/>

            {/* onClickには、このコンポーネント内で定義した関数を渡します */}
            <ItemButton item={'パスワード作成'} onClick={handleGeneratePassword}></ItemButton>
        </div>
    );
}
