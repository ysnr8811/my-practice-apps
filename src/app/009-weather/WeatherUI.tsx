'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; // next/imageからImageコンポーネントをインポート

// (WeatherDataの型定義は変更なし)
interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
}


export default function WeatherUI() {
    const searchParams = useSearchParams();
    const label = searchParams.get("label") || "009-天気情報アプリ";

    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            const response = await fetch(`/api/weather?city=${city}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || '天気情報の取得に失敗しました。');
            }

            setWeather(data);
        } catch (err: unknown) { // ★修正: anyをunknownに変更
            // ★追加: errがErrorインスタンスかチェックする（型ガード）
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('不明なエラーが発生しました。');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8">{label}</h1>

            <div className="flex gap-2 mb-8">
                <input
                    type="text"
                    placeholder="都市名を入力 (例: Tokyo)"
                    className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={fetchWeather}
                    disabled={!city || loading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '取得中...' : '天気を見る'}
                </button>
            </div>

            {error && (
                <p className="text-red-400 bg-red-900 bg-opacity-50 p-3 rounded-lg text-center">{error}</p>
            )}

            {weather && (
                <div className="bg-gray-700 p-8 rounded-xl shadow-inner text-center animate-fade-in">
                    <h2 className="text-4xl font-bold mb-4">{weather.name}, {weather.sys.country}</h2>
                    <div className="flex items-center justify-center mb-4">
                        {/* ★修正: imgをImageコンポーネントに変更 */}
                        <Image
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                            alt={weather.weather[0].description}
                            width={100} // widthとheightの指定が必須
                            height={100}
                            className="w-24 h-24"
                        />
                        <p className="text-6xl font-extrabold">{Math.round(weather.main.temp)}°C</p>
                    </div>
                    <p className="text-2xl mb-2 capitalize">{weather.weather[0].description}</p>
                    <p className="text-lg text-gray-300">体感温度: {Math.round(weather.main.feels_like)}°C</p>
                    <p className="text-lg text-gray-300">最低: {Math.round(weather.main.temp_min)}°C / 最高: {Math.round(weather.main.temp_max)}°C</p>
                    <p className="text-base mt-4 text-gray-400">湿度: {weather.main.humidity}% | 風速: {weather.wind.speed} m/s</p>
                </div>
            )}

            {!weather && !loading && !error && (
                <p className="text-lg text-gray-400 text-center">都市名を入力して天気を検索してください。</p>
            )}
        </div>
    );
}
