'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// 通貨換算アプリのUIコンポーネント
export default function CurrencyUI() {
  // URLからラベルを取得
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "010-通貨換算ツール";

  // --- Stateの定義 ---
  const [amount, setAmount] = useState<number>(1); // 金額
  const [fromCurrency, setFromCurrency] = useState<string>('USD'); // 換算元通貨
  const [toCurrency, setToCurrency] = useState<string>('JPY'); // 換算先通貨
  const [currencies, setCurrencies] = useState<string[]>([]); // 通貨リスト
  const [conversionResult, setConversionResult] = useState<number | null>(null); // 換算結果
  const [loading, setLoading] = useState<boolean>(false); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  // APIキーを環境変数から取得
  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

  // --- 副作用フック (useEffect) ---

  // 1. コンポーネントのマウント時に通貨リストを取得する
  useEffect(() => {
    if (!API_KEY) {
      setError('APIキーが設定されていません。');
      return;
    }
    // APIから対応通貨のリストを取得
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
          setCurrencies(Object.keys(data.conversion_rates));
        } else {
          setError('通貨リストの取得に失敗しました。');
        }
      })
      .catch(() => setError('APIへの接続に失敗しました。'));
  }, [API_KEY]);

  // 2. 金額や通貨が変更されたときに換算を実行する
  useEffect(() => {
    if (!API_KEY || !fromCurrency || !toCurrency) return;

    setLoading(true);
    setError(null);

    // APIから最新のレートを取得
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
          const rate = data.conversion_rates[toCurrency];
          setConversionResult(amount * rate);
        } else {
          setError('為替レートの取得に失敗しました。');
        }
      })
      .catch(() => setError('為替レートの取得中にエラーが発生しました。'))
      .finally(() => setLoading(false));

  }, [amount, fromCurrency, toCurrency, API_KEY]);

  // --- イベントハンドラ ---

  /**
   * 換算元と換算先の通貨を入れ替える関数
   */
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">{label}</h1>

      {/* エラー表示 */}
      {error && <p className="text-red-400 bg-red-900 bg-opacity-50 p-3 rounded-lg text-center mb-4">{error}</p>}

      {/* 入力フォーム */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* 金額 */}
        <div className="md:col-span-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">金額</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* 換算元 */}
        <div className="md:col-span-1">
          <label htmlFor="from" className="block text-sm font-medium text-gray-300 mb-1">換算元</label>
          <select id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded">
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {/* 入れ替えボタン */}
        <div className="flex justify-center items-end">
          <button onClick={handleSwapCurrencies} className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-transform duration-300 hover:rotate-180">
            &#x21C6; {/* Unicode arrow symbol */}
          </button>
        </div>
        {/* 換算先 */}
        <div className="md:col-span-1">
          <label htmlFor="to" className="block text-sm font-medium text-gray-300 mb-1">換算先</label>
          <select id="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full p-3 bg-gray-700 border border-gray-600 rounded">
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* 換算結果 */}
      <div className="mt-8 text-center">
        {loading ? (
          <p className="text-2xl text-gray-400">計算中...</p>
        ) : conversionResult !== null ? (
          <>
            <p className="text-lg text-gray-400">{amount} {fromCurrency} =</p>
            <p className="text-4xl font-bold text-green-400">
              {conversionResult.toFixed(2)} <span className="text-3xl">{toCurrency}</span>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
