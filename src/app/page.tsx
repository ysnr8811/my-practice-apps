// useRouterのようなクライアントサイドの機能を使うために必要なディレクティブです。
"use client";

// Next.jsから画面遷移のためのuseRouterフックをインポートします。
import { useRouter } from "next/navigation";

// これがホームページのメインコンポーネントです。
export default function Home() {
  // 画面遷移を扱うためにルーターオブジェクトを取得します。
  const router = useRouter();

  // ボタンのリストを生成するために、1から10までの10個の数字の配列を作成します。
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  // ボタンクリックを処理する関数です。新しいページに遷移します。
  const handleButtonClick = (item: number) => {
    router.push(`/item/${item}`);
  };

  return (
    // インラインスタイルを使って、このdivとその子要素のテキストコンテンツを中央揃えにします。
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to my Next.js App</h1>

      {/* ボタンを5列のグリッドで表示するためのコンテナ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
        {/* 'items'配列をループして、各アイテムに対応するボタンを作成します。 */}
        {items.map((item) => (
          // このボタンがクリックされると、handleButtonClick関数が呼び出されます。
          <button key={item} onClick={() => handleButtonClick(item)}>
            Go to Item {item}
          </button>
        ))}
      </div>
    </div>
  );
}
