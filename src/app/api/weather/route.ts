import { NextRequest, NextResponse } from 'next/server';

/**
 * 天気情報を取得するAPIルート
 * @param request フロントエンドからのリクエスト情報
 */
export async function GET(request: NextRequest) {
  // リクエストURLからクエリパラメータを取得
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');

  // サーバーサイドの環境変数からAPIキーを取得
  const apiKey = process.env.OPENWEATHER_API_KEY;

  // APIキーが設定されていない場合はエラーを返す
  if (!apiKey) {
    return NextResponse.json({ message: 'APIキーがサーバーに設定されていません。' }, { status: 500 });
  }

  // 都市名が指定されていない場合はエラーを返す
  if (!city) {
    return NextResponse.json({ message: '都市名を指定してください。' }, { status: 400 });
  }

  // OpenWeatherMap APIのエンドポイントURL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    // OpenWeatherMap APIにリクエストを送信
    const response = await fetch(url);
    const data = await response.json();

    // APIからエラーが返された場合 (例: 都市が見つからない)
    if (!response.ok) {
      return NextResponse.json({ message: data.message || '天気情報の取得に失敗しました。' }, { status: response.status });
    }

    // 成功した場合、取得した天気情報をフロントエンドに返す
    return NextResponse.json(data);

  } catch (error) {
    console.error('APIルートでエラーが発生しました:', error);
    return NextResponse.json({ message: 'サーバー内部でエラーが発生しました。' }, { status: 500 });
  }
}
