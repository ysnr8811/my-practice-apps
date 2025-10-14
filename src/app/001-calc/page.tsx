// このファイルはクライアントサイドで動作することを示す宣言です。
'use client';

// 必要なコンポーネントやフックをインポートします。
import CommonLayout from '../../components/CommonLayout'; // 共通レイアウトコンポーネント
import { useSearchParams } from 'next/navigation'; // URLのクエリパラメータを読み取るためのフック
import Display from './components/Display'; // 計算結果を表示するディスプレイコンポーネント
import CalcButton from './components/CalcButton'; // 電卓のボタンコンポーネント
import { useState } from 'react'; // コンポーネントの状態を管理するためのReactフック

// 電卓ページのメインコンポーネント
export default function CalcPage() {
  // URLのクエリパラメータを取得します (例: /?label=電卓)
  const searchParams = useSearchParams();
  // 'label'というクエリパラメータの値を取得し、なければデフォルト値を設定します。
  const label = searchParams.get('label') || '001-電卓アプリ';

  // --- 電卓の状態を管理する変数 --- (useStateフック)
  // useStateは [現在の値, 値を更新する関数] のペアを返します。

  // ディスプレイに表示する現在の値
  const [displayValue, setDisplayValue] = useState('0');
  // 最初に保持する数値（計算の左側のオペランド）
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  // 現在選択されている演算子（+, -, ×, ÷）
  const [operator, setOperator] = useState<string | null>(null);
  // 次に入力されるのが2番目の数値かどうかを示すフラグ
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // --- 電卓のロジックを定義する関数 ---

  /**
   * 数字ボタンが押されたときの処理
   * @param digit 押された数字 (例: '7')
   */
  const inputDigit = (digit: string) => {
    // 演算子が押された直後（2番目の数値を待っている状態）の場合
    if (waitingForSecondOperand) {
      setDisplayValue(digit); // ディスプレイの表示を新しい数字で上書き
      setWaitingForSecondOperand(false); // 2番目の数値の入力を開始したのでフラグをfalseに
    } else {
      // それ以外の場合、現在の表示に数字を追加
      // ただし、現在の表示が'0'なら、その数字で置き換える
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  /**
   * 小数点ボタンが押されたときの処理
   */
  const inputDecimal = () => {
    // 演算子が押された直後の場合
    if (waitingForSecondOperand) {
      setDisplayValue('0.'); // '0.'から入力を開始
      setWaitingForSecondOperand(false);
      return; // 処理を終了
    }
    // すでに小数点が入力されていない場合のみ、追加
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  /**
   * クリア（C）ボタンが押されたときの処理
   * 全ての状態を初期値に戻す
   */
  const clearCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * 演算子（+, -, ×, ÷, =）ボタンが押されたときの処理
   * @param nextOperator 押された演算子
   */
  const performOperation = (nextOperator: string) => {
    // ディスプレイの表示を数値に変換
    const inputValue = parseFloat(displayValue);

    // '='が押された場合
    if (nextOperator === '=') {
      // 演算子と最初の数値がセットされている場合のみ計算を実行
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(result)); // 計算結果をディスプレイに表示
        // 計算が終わったので、状態をリセット
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
      }
      return; // '='の処理はここで終了
    }

    // 最初の数値がまだセットされていない場合
    if (firstOperand === null) {
      setFirstOperand(inputValue); // 現在の入力値を最初の数値として保持
    } else if (operator) {
      // 最初の数値と演算子がすでにセットされている場合（例: 3 + 5 - のように連続で演算）
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result)); // 途中計算の結果を表示
      setFirstOperand(result); // 計算結果を次の計算のために保持
    }

    // 次は2番目の数値を入力する状態になる
    setWaitingForSecondOperand(true);
    // 押された演算子を保持
    setOperator(nextOperator);
  };

  /**
   * 実際の計算を行う関数
   * @param first 1番目の数値
   * @param second 2番目の数値
   * @param op 演算子
   * @returns 計算結果
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
        // 0で割ることはできないので、NaN（Not a Number）を返す
        if (second === 0) {
          return NaN;
        }
        return first / second;
      default:
        return second; // 不明な演算子の場合は2番目の数値をそのまま返す
    }
  };

  // --- 画面に表示する内容（JSX） ---
  return (
    <CommonLayout>
      {/* 電卓全体のコンテナ */}
      <div className="w-full max-w-xs mx-auto mt-10"> {/* 横幅、中央寄せ、上のマージン */}
        <h2 className="text-center text-2xl mb-4">{label}</h2> {/* ページタイトル */}
        <div className="border rounded-lg shadow-lg"> {/* 電卓の枠線、角丸、影 */}
          {/* ディスプレイコンポーネント。現在の表示値を渡す */}
          <Display value={displayValue} />

          {/* 電卓のボタン部分。CSS Gridを使って格子状に配置 */}
          <div className="grid grid-cols-4 gap-px bg-gray-400 rounded-b-lg overflow-hidden">
            {/* 1段目 */}
            <CalcButton onClick={clearCalculator} label="C" className="col-span-3 bg-gray-300" />
            <CalcButton onClick={() => performOperation('÷')} label="÷" className="bg-orange-400 text-white" />

            {/* 2段目 */}
            <CalcButton onClick={() => inputDigit('7')} label="7" />
            <CalcButton onClick={() => inputDigit('8')} label="8" />
            <CalcButton onClick={() => inputDigit('9')} label="9" />
            <CalcButton onClick={() => performOperation('×')} label="×" className="bg-orange-400 text-white" />

            {/* 3段目 */}
            <CalcButton onClick={() => inputDigit('4')} label="4" />
            <CalcButton onClick={() => inputDigit('5')} label="5" />
            <CalcButton onClick={() => inputDigit('6')} label="6" />
            <CalcButton onClick={() => performOperation('-')} label="-" className="bg-orange-400 text-white" />

            {/* 4段目 */}
            <CalcButton onClick={() => inputDigit('1')} label="1" />
            <CalcButton onClick={() => inputDigit('2')} label="2" />
            <CalcButton onClick={() => inputDigit('3')} label="3" />
            <CalcButton onClick={() => performOperation('+')} label="+" className="bg-orange-400 text-white" />

            {/* 5段目 */}
            <CalcButton onClick={() => inputDigit('0')} label="0" className="col-span-2" />
            <CalcButton onClick={inputDecimal} label="." />
            <CalcButton onClick={() => performOperation('=')} label="=" className="bg-orange-400 text-white" />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
