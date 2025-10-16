/**
 * ReactからSuspenseコンポーネントをインポートします。
 * Suspenseは、子コンポーネントの読み込みが完了するまでフォールバックUIを表示するために使います。
 */
import {Suspense} from 'react';

/**
 * 先ほど作成した電卓のUIコンポーネントをインポートします。
 */
import CalculatorUI from './components/CalculatorUI';
import CommonLayout from '../../components/CommonLayout';

/**
 * 電卓ページのメインコンポーネントです。
 * このコンポーネント自体はサーバーサイドでレンダリングされます。
 */
export default function CalcPage() {
    return (
        <CommonLayout>
            <Suspense fallback={<div>読み込み中...</div>}>
                <CalculatorUI/>
            </Suspense>
        </CommonLayout>
    );
}