'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// 映画データの型定義
interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
}

export default function ReviewUI() {
  const searchParams = useSearchParams();
  const label = searchParams.get("label") || "007-映画・書籍レビューサイト";

  // --- Stateの定義 ---
  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリ
  const [movies, setMovies] = useState<Movie[]>([]); // 検索結果の映画リスト
  const [loading, setLoading] = useState(false); // ローディング状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  // TMDb APIキーを環境変数から取得
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // ポスター画像のベースURL

  /**
   * 映画を検索する関数
   */
  const searchMovies = async () => {
    if (!searchQuery.trim()) return; // 検索クエリが空の場合は何もしない
    if (!TMDB_API_KEY) {
      setError('TMDb APIキーが設定されていません。環境変数を確認してください。');
      return;
    }

    setLoading(true); // ローディング開始
    setError(null); // エラーをリセット
    setMovies([]); // 以前の検索結果をクリア

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=ja-JP`
      );

      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMovies(data.results); // 検索結果をstateにセット

    } catch (err) {
      console.error('映画検索エラー:', err);
      setError(err instanceof Error ? err.message : '映画の検索中にエラーが発生しました。');
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">{label}</h1>

      {/* 検索フォーム */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies()} // Enterキーでも検索可能に
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="映画タイトルを入力して検索..."
        />
        <button
          onClick={searchMovies}
          disabled={loading} // ローディング中はボタンを無効化
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </div>

      {/* エラーメッセージ表示 */}
      {error && <p className="text-red-400 text-center mb-4">エラー: {error}</p>}

      {/* 検索結果表示 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length === 0 && !loading && !error && searchQuery.trim() && (
          <p className="col-span-full text-center text-gray-400">映画が見つかりませんでした。</p>
        )}
        {movies.map(movie => (
          <div key={movie.id} className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
            {movie.poster_path ? (
              <img
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-600 flex items-center justify-center text-gray-400 text-sm">
                画像なし
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-400">公開日: {movie.release_date}</p>
              {/* 概要は省略。必要であれば詳細ページで表示 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
