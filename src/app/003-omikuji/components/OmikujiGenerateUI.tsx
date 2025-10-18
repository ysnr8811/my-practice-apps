import ItemButton from "@/components/ItemButton";
import {useState} from "react";
import OutPutOmikujiResult from "@/app/003-omikuji/components/OutPutOmikujiResult";

/**
 * おみくじ作成UI
 */
export default function OmikujiGenerateUI() {
    /**
     * おみくじの結果を保持するstate
     */
    const [omikujiResult, setOmikujiResult] = useState<string>('');

    /**
     * ボタンのテキストを保持するstate。初期値を設定します。
     */
    const [buttonText, setButtonText] = useState<string>('ボタンをクリックしてください');

    const [clearButtonText, setClearButtonText] = useState<string>('クリア');

    /**
     * ボタンがクリックされたときにおみくじの結果を生成し、stateを更新する関数
     */
    function getOmikujiResult() {
        const results = ['大吉', '中吉', '小吉', '吉', '末吉', '凶', '大凶'];
        const result = results[Math.floor(Math.random() * results.length)];

        // stateを更新して、画面を再レンダリングします。
        setOmikujiResult(result);
        setButtonText('もう一度おみくじを引く');
    }

    function clearOmikujiResult(): void {
        setOmikujiResult('');
        setButtonText('ボタンをクリックしてください');
    }

    return (
        <div>
            {/* 結果表示コンポーネントにおみくじの結果を渡します */}
            <OutPutOmikujiResult omikujiResult={omikujiResult}></OutPutOmikujiResult>

            <br/>

            {/* ボタンコンポーネントに現在のテキストとクリックイベントの関数を渡します */}
            <ItemButton item={buttonText} onClick={getOmikujiResult}></ItemButton>

            <br/>

            <ItemButton item={clearButtonText} onClick={clearOmikujiResult}></ItemButton>
        </div>
    );

}
