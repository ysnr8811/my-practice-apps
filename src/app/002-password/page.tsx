"use client";

import CommonLayout from "../../components/CommonLayout";
import {useSearchParams} from "next/navigation";
import ItemButton from "@/components/ItemButton";
import PassWordOutputLabel from "@/app/002-password/components/PassWordOutputLabel";
import {TypeSelectBox} from "@/app/002-password/components/TypeSelectBox";

interface PasswordPageProps {
    onClick: (item: string) => void
}

export default function PasswordPage({onClick}: PasswordPageProps) {
    const searchParams = useSearchParams();
    const label = searchParams.get("label") || "002-パスワード自動生成ツール";

    /**
     * 英語のセレクトボックスの選択肢
     */
    const englishOptions = [
        { value: 'lower', label: '小文字 (a-z)' },
        { value: 'upper', label: '大文字 (A-Z)' },
        { value: 'both', label: '両方' },
    ];

    /**
     * 数字のセレクトボックスの選択肢
     */
    const numberOptions = [
        { value: 'none', label: '-'},
        { value: 'common', label: '0123456789'}
    ]

    /**
     * 記号のセレクトボックスの選択肢
     */
    const symbolOptions = [
        { value: 'none', label: '-'},
        { value: 'common', label: '!@#$%' }
    ];

    return (
        <CommonLayout>
            <div className="w-full mx-auto">
                <h1>{label}</h1>

                <br/>

                <PassWordOutputLabel></PassWordOutputLabel>

                <br/>

                <fieldset className={'border-2 border-gray-300 rounded-md p-4'}>

                    <legend>パスワードに利用する文字列の種類を選択してください</legend>

                    <TypeSelectBox name={'英語'} options={englishOptions}></TypeSelectBox>
                    <TypeSelectBox name={'数字'} options={numberOptions}></TypeSelectBox>
                    <TypeSelectBox name={'記号'} options={symbolOptions}></TypeSelectBox>


                </fieldset>


                <br/>

                <ItemButton item={'パスワード作成'} onClick={onClick}></ItemButton>
            </div>
        </CommonLayout>
    );
}
