// このファイルはクライアントサイドで動作することを示す宣言です。
'use client';


// 必要なコンポーネントやフックをインポートします。
import {useSearchParams} from 'next/navigation'; // URLのクエリパラメータ（例: ?label=）を取得するためのNext.jsフックをインポート
import Display from './Display'; // 計算結果や現在の入力を表示するUIコンポーネントをインポート
import CalcButton from './CalcButton'; // 数字、演算子、クリアなどの電卓ボタンUIコンポーネントをインポート
import {useState} from 'react'; // コンポーネントの状態（データ）を保持・更新するためのReactフックをインポート

/**
 * 電卓UIのメインコンポーネント。電卓の機能（ロジックと状態管理）を実装する。
 */
export default function CalculatorUI() {
    /**
     * URLのクエリパラメータを取得します (例: /?label=電卓)
     */
    const searchParams = useSearchParams();

    /**
     * 'label'というクエリパラメータの値を取得し、なければデフォルト値を設定します。
     * この値は電卓のタイトルとして使用されます。
     */
    const label = searchParams.get('label') || '001-電卓アプリ';

    // --- 電卓の状態を管理する変数 --- (useStateフック)
    // ディスプレイに表示する現在の文字列（入力値または計算結果）を保持
    const [displayValue, setDisplayValue] = useState('0');
    // 最初に保持する数値（計算の左側のオペランド）を保持
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    // 現在選択されている演算子（+, -, ×, ÷）を保持
    const [operator, setOperator] = useState<string | null>(null);
    // 次の入力が2番目の数値（計算の右側のオペランド）であることを示すフラグ
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    /**
     * --- 電卓のロジックを定義する関数 ---
     */

    /**
     * 数字ボタンが押されたときの処理。ディスプレイの表示を更新する。
     * @param digit 押された数字の文字列
     */
    const inputDigit = (digit: string) => {
        // 演算子を押した後（2番目の数値待ち状態）なら、ディスプレイを新しい数字で上書きする
        if (waitingForSecondOperand) {
            setDisplayValue(digit);
            setWaitingForSecondOperand(false);
        } else {
            // 現在の表示が '0' なら置き換え、そうでなければ数字を追加して連結する
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    };

    /**
     * 小数点ボタンが押されたときの処理。小数点（.）を入力に追加する。
     */
    const inputDecimal = () => {
        // 2番目の数値待ち状態なら、'0.' から入力を開始
        if (waitingForSecondOperand) {
            setDisplayValue('0.');
            setWaitingForSecondOperand(false);
            return;
        }
        // ディスプレイにまだ小数点がなければ追加
        if (!displayValue.includes('.')) {
            setDisplayValue(displayValue + '.');
        }
    };

    /**
     * クリア（C）ボタンが押されたときの処理。電卓の全状態を初期値にリセットする。
     */
    const clearCalculator = () => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    /**
     * 演算子（+, -, ×, ÷, =）ボタンが押されたときの処理。計算の実行や状態遷移を制御する。
     * @param nextOperator 押された演算子の文字列
     */
    const performOperation = (nextOperator: string) => {
        // 現在のディスプレイの表示を数値に変換
        const inputValue = parseFloat(displayValue);

        // '='が押された場合：保持している値と現在の入力値で計算を実行
        if (nextOperator === '=') {
            if (operator && firstOperand !== null) {
                const result = calculate(firstOperand, inputValue, operator); // 計算実行
                setDisplayValue(String(result)); // 結果を表示
                setFirstOperand(null); // 状態をリセット
                setOperator(null);
                setWaitingForSecondOperand(false);
            }
            return;
        }

        // 最初の数値が未設定なら、現在の入力値を保持して次の入力を待つ
        if (firstOperand === null) {
            setFirstOperand(inputValue);
        }
        // 最初の数値と演算子が設定済みなら、連続演算として途中計算を実行
        else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            setDisplayValue(String(result)); // 途中結果を表示
            setFirstOperand(result); // 途中結果を次の計算の最初の数値として保持
        }

        // 次の入力は2番目の数値として扱うためのフラグをONにし、現在の演算子を保持
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    /**
     * 実際の計算ロジック。2つの数値と演算子を受け取り、結果を返す。
     * @param first 1番目の数値
     * @param second 2番目の数値
     * @param op 演算子の文字列
     * @returns 計算結果の数値
     */
    const calculate = (first: number, second: number, op: string): number => {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '×':
                return first * second;
            case '÷':
                // 0除算のチェック
                if (second === 0) return NaN;
                return first / second;
            default:
                return second;
        }
    };

    // --- 画面に表示する内容（JSX） ---
    return (
        // 電卓の全体コンテナ（Tailwind CSSで幅や中央寄せを設定）
        <div className="w-full max-w-xs mx-auto mt-10">
            <h2 className="text-center text-2xl mb-4">{label}</h2> {/* URLから取得したタイトルを表示 */}
            <div className="border rounded-lg shadow-lg">
                <Display value={displayValue}/> {/* 現在の表示値（状態: displayValue）を渡す */}
                {/* ボタンを4列のグリッドで配置するコンテナ */}
                <div className="grid grid-cols-4 gap-px bg-gray-400 rounded-b-lg overflow-hidden">
                    {/* クリアボタン（C）：3列分の幅を占める */}
                    <CalcButton onClick={clearCalculator} label="C" className="col-span-3 bg-gray-300"/>
                    {/* 演算子ボタン */}
                    <CalcButton onClick={() => performOperation('÷')} label="÷" className="bg-orange-400 text-white"/>

                    {/* 数字ボタン */}
                    <CalcButton onClick={() => inputDigit('7')} label="7"/>
                    <CalcButton onClick={() => inputDigit('8')} label="8"/>
                    <CalcButton onClick={() => inputDigit('9')} label="9"/>
                    <CalcButton onClick={() => performOperation('×')} label="×" className="bg-orange-400 text-white"/>

                    {/* 数字ボタン */}
                    <CalcButton onClick={() => inputDigit('4')} label="4"/>
                    <CalcButton onClick={() => inputDigit('5')} label="5"/>
                    <CalcButton onClick={() => inputDigit('6')} label="6"/>
                    <CalcButton onClick={() => performOperation('-')} label="-" className="bg-orange-400 text-white"/>

                    {/* 数字ボタン */}
                    <CalcButton onClick={() => inputDigit('1')} label="1"/>
                    <CalcButton onClick={() => inputDigit('2')} label="2"/>
                    <CalcButton onClick={() => inputDigit('3')} label="3"/>
                    <CalcButton onClick={() => performOperation('+')} label="+" className="bg-orange-400 text-white"/>

                    {/* 数字ボタン '0'（2列分の幅を占める）、小数点ボタン、イコールボタン */}
                    <CalcButton onClick={() => inputDigit('0')} label="0" className="col-span-2"/>
                    <CalcButton onClick={inputDecimal} label="."/>
                    <CalcButton onClick={() => performOperation('=')} label="=" className="bg-orange-400 text-white"/>
                </div>
            </div>
        </div>
    );
}