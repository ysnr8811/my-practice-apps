// このファイルはクライアントサイドで動作することを示す宣言です。
'use client';

// 必要なコンポーネントやフックをインポートします。
import { useSearchParams } from 'next/navigation'; // URLのクエリパラメータ（例: ?label=）を取得するためのNext.jsフックをインポート
import Display from './Display'; // 計算結果や入力を表示するUIコンポーネントをインポート
import CalcButton from './CalcButton'; // 数字、演算子、クリアなどのボタンUIコンポーネントをインポート
import { useState } from 'react'; // コンポーネント内で状態（データ）を保持・更新するためのReactフックをインポート

/**
 * 電卓UIのメインコンポーネント。状態管理とロジックを担う。
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
    // ディスプレイに表示されている現在の文字列（入力値または結果）を保持
    const [displayValue, setDisplayValue] = useState('0');
    // 最初に保持する数値（計算の左側のオペランド）を保持 (初期値はnull)
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    // 現在選択されている演算子（+, -, ×, ÷）を保持 (初期値はnull)
    const [operator, setOperator] = useState<string | null>(null);
    // 次に入力されるのが2番目の数値（計算の右側のオペランド）かどうかを示すフラグ
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    /**
     * --- 電卓のロジックを定義する関数 ---
     */

    /**
     * 数字ボタンが押されたときの処理
     * @param digit 押された数字の文字列
     */
    const inputDigit = (digit: string) => {
        // 演算子が押された直後であれば、新しい数字でディスプレイを上書きし、2番目の数値の入力を開始
        if (waitingForSecondOperand) {
            setDisplayValue(digit);
            setWaitingForSecondOperand(false);
        } else {
            // '0'が表示されている場合は置き換え、それ以外は現在の表示に追加
            setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
        }
    };

    /**
     * 小数点ボタンが押されたときの処理
     */
    const inputDecimal = () => {
        // 演算子直後なら '0.' から入力を開始
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
     * クリア（C）ボタンが押されたときの処理。電卓の状態を初期値にリセットする。
     */
    const clearCalculator = () => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    /**
     * 演算子（+, -, ×, ÷, =）ボタンが押されたときの処理。計算の実行や次の演算子の設定を行う。
     * @param nextOperator 押された演算子の文字列
     */
    const performOperation = (nextOperator: string) => {
        // 現在のディスプレイの値を数値に変換
        const inputValue = parseFloat(displayValue);

        // '='が押された場合：計算を実行し、状態をリセット
        if (nextOperator === '=') {
            if (operator && firstOperand !== null) {
                const result = calculate(firstOperand, inputValue, operator); // 保持している値と入力値で計算
                setDisplayValue(String(result)); // 結果を表示
                setFirstOperand(null); // 最初のオペランドをリセット
                setOperator(null); // 演算子をリセット
                setWaitingForSecondOperand(false); // 2番目の数値待ち状態を解除
            }
            return;
        }

        // 最初の数値が未設定なら、現在の入力値を最初の数値として保持
        if (firstOperand === null) {
            setFirstOperand(inputValue);
        } else if (operator) {
            // 最初の数値と演算子が設定済みなら、連続演算として途中計算を実行
            const result = calculate(firstOperand, inputValue, operator);
            setDisplayValue(String(result)); // 途中結果を表示
            setFirstOperand(result); // 途中結果を次の計算の最初の数値として保持
        }

        // 次の入力は2番目の数値として扱うためフラグをON
        setWaitingForSecondOperand(true);
        // 押された演算子を保持
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
            case '+': return first + second;
            case '-': return first - second;
            case '×': return first * second;
            case '÷':
                // 0除算チェック
                if (second === 0) return NaN;
                return first / second;
            default: return second; // 未知の演算子の場合は2番目の数値をそのまま返す（安全策）
        }
    };

    // --- 画面に表示する内容（JSX） ---
    return (
        <div className="w-full max-w-xs mx-auto mt-10">
            <h2 className="text-center text-2xl mb-4">{label}</h2> {/* URLクエリから取得したタイトルを表示 */}
            <div className="border rounded-lg shadow-lg">
                <Display value={displayValue} /> {/* 現在の表示値（状態: displayValue）をDisplayコンポーネントに渡す */}
                <div className="grid grid-cols-4 gap-px bg-gray-400 rounded-b-lg overflow-hidden">
                    {/* ボタン群：それぞれのボタンが対応するロジック関数（inputDigit, performOperation, clearCalculator）を呼び出す */}
                    <CalcButton onClick={clearCalculator} label="C" className="col-span-3 bg-gray-300" />
                    <CalcButton onClick={() => performOperation('÷')} label="÷" className="bg-orange-400 text-white" />

                    <CalcButton onClick={() => inputDigit('7')} label="7" />
                    {/* ... 他の数字ボタン ... */}

                    <CalcButton onClick={() => performOperation('×')} label="×" className="bg-orange-400 text-white" />

                    {/* ... 他の数字ボタン ... */}

                    <CalcButton onClick={() => performOperation('-')} label="-" className="bg-orange-400 text-white" />

                    {/* ... 他の数字ボタン ... */}

                    <CalcButton onClick={() => performOperation('+')} label="+" className="bg-orange-400 text-white" />

                    <CalcButton onClick={() => inputDigit('0')} label="0" className="col-span-2" />
                    <CalcButton onClick={inputDecimal} label="." />
                    <CalcButton onClick={() => performOperation('=')} label="=" className="bg-orange-400 text-white" />
                </div>
            </div>
        </div>
    );
}