// このファイルはクライアントサイドで動作することを示す宣言です。
'use client';

// 必要なコンポーネントやフックをインポートします。
import CommonLayout from '../../../components/CommonLayout'; // 共通レイアウトコンポーネント
import { useSearchParams } from 'next/navigation'; // URLのクエリパラメータを読み取るためのフック
import Display from './Display'; // 計算結果を表示するディスプレイコンポーネント
import CalcButton from './CalcButton'; // 電卓のボタンコンポーネント
import { useState } from 'react'; // コンポーネントの状態を管理するためのReactフック

// 電卓UIのメインコンポーネント
export default function CalculatorUI() {
  // URLのクエリパラメータを取得します (例: /?label=電卓)
  const searchParams = useSearchParams();
  // 'label'というクエリパラメータの値を取得し、なければデフォルト値を設定します。
  const label = searchParams.get('label') || '001-電卓アプリ';

  // --- 電卓の状態を管理する変数 --- (useStateフック)
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // --- 電卓のロジックを定義する関数 ---
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);
    if (nextOperator === '=') {
      if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        setDisplayValue(String(result));
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
      }
      return;
    }
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '×': return first * second;
      case '÷':
        if (second === 0) return NaN;
        return first / second;
      default: return second;
    }
  };

  return (
    <CommonLayout>
      <div className="w-full max-w-xs mx-auto mt-10">
        <h2 className="text-center text-2xl mb-4">{label}</h2>
        <div className="border rounded-lg shadow-lg">
          <Display value={displayValue} />
          <div className="grid grid-cols-4 gap-px bg-gray-400 rounded-b-lg overflow-hidden">
            <CalcButton onClick={clearCalculator} label="C" className="col-span-3 bg-gray-300" />
            <CalcButton onClick={() => performOperation('÷')} label="÷" className="bg-orange-400 text-white" />
            <CalcButton onClick={() => inputDigit('7')} label="7" />
            <CalcButton onClick={() => inputDigit('8')} label="8" />
            <CalcButton onClick={() => inputDigit('9')} label="9" />
            <CalcButton onClick={() => performOperation('×')} label="×" className="bg-orange-400 text-white" />
            <CalcButton onClick={() => inputDigit('4')} label="4" />
            <CalcButton onClick={() => inputDigit('5')} label="5" />
            <CalcButton onClick={() => inputDigit('6')} label="6" />
            <CalcButton onClick={() => performOperation('-')} label="-" className="bg-orange-400 text-white" />
            <CalcButton onClick={() => inputDigit('1')} label="1" />
            <CalcButton onClick={() => inputDigit('2')} label="2" />
            <CalcButton onClick={() => inputDigit('3')} label="3" />
            <CalcButton onClick={() => performOperation('+')} label="+" className="bg-orange-400 text-white" />
            <CalcButton onClick={() => inputDigit('0')} label="0" className="col-span-2" />
            <CalcButton onClick={inputDecimal} label="." />
            <CalcButton onClick={() => performOperation('=')} label="=" className="bg-orange-400 text-white" />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}