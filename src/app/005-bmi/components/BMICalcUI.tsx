import NumberInput from "@/app/005-bmi/components/NumberInput";
import {useState} from "react";

export default function BMICalcUI() {

    /**
     * 身長管理するstate
     */
    const [height, setHight] = useState<number>(0);
    /**
     * 体重管理するstate
     */
    const [weight, setWeight] = useState<number>(0);


    function calcBMI() {

    }

    return (
        <>
            BMI判定

            <br/>
            <br/>

            <label>BMI計算結果　表示予定</label>

            <br/>
            <br/>

            身長(cm)<NumberInput value={height}></NumberInput>
            体重(kg)<NumberInput value={weight}></NumberInput>

            <br/>
            <br/>

            <button
                className={`bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg`}
                onClick={calcBMI}
            >
                ！！！計算！！！
            </button>

        </>
    );
}