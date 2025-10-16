// ReactからSuspenseコンポーネントをインポートします。
import { Suspense } from 'react';
import CommonLayout from "../../components/CommonLayout";
import PassWordGenerateUI from "@/app/002-password/components/PassWordGenerateUI";

/**
 * パスワード生成ページのメインコンポーネント（サーバーコンポーネント）
 */
export default function PasswordPage() {
    return (
        <CommonLayout>

            <Suspense fallback={<div>読み込み中...</div>}>

                <PassWordGenerateUI />

            </Suspense>

        </CommonLayout>
    );
}
