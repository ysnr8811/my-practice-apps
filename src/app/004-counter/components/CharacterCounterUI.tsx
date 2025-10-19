import {useState} from "react";
import {useSearchParams} from "next/navigation";
import CountResultOutputLabel from "@/app/004-counter/components/CountResultOutputLabel";
import InputTextBox from "@/app/004-counter/components/InputTextBox";

export default function CharacterCounterUI() {

    const searchParams = useSearchParams();
    const label = searchParams.get("label") || "004-文字数カウンター";

    const [text, setText] = useState<string>('');

    return (
        <div>
            <h1>{label}</h1>

            <CountResultOutputLabel charCount={text.length}></CountResultOutputLabel >

            <InputTextBox text={text} onTextChange={setText}></InputTextBox>
        </div>
    );
}