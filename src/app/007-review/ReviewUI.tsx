'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; // next/imageからImageコンポーネントをインポート

// (Movieの型定義は変更なし)
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

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    if (!TMDB_API_KEY) {
      setError('TMDb APIキーが設定されていません。環境変数を確認してください。');
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=ja-JP`
      );

      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setMovies(data.results);

    } catch (err) {
      console.error('映画検索エラー:', err);
      // ★修正: anyをunknownに変更し、型ガードを追加
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('映画の検索中に不明なエラーが発生しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">{label}</h1>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="映画タイトルを入力して検索..."
        />
        <button
          onClick={searchMovies}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </div>

      {error && <p className="text-red-400 text-center mb-4">エラー: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 && movies.map(movie => (
          <div key={movie.id} className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
            {movie.poster_path ? (
              // ★修正: imgをImageコンポーネントに変更
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={200} // 画像の基本サイズを指定
                height={300}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-600 flex items-center justify-center text-gray-400 text-sm">
                画像なし
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-400">公開日: {movie.release_date}</p>
            </div>
          </div>
        ))}
        {movies.length === 0 && !loading && !error && (
          <p className="col-span-full text-center text-gray-400">検索結果はここに表示されます。</p>
        )}
      </div>
    </div>
  );
}
