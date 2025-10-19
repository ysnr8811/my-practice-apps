import NumberInput from "@/app/005-bmi/components/NumberInput";
import {useEffect, useState} from "react";

export default function BMICalcUI() {

    /**
     * 身長管理するstate
     */
    const [heightCm, setHeightCm] = useState<number>(0);
    /**
     * 体重管理するstate
     */
    const [weight, setWeight] = useState<number>(0);

    const [bmi, setBmi] = useState<string>('');
    useEffect(() => {
        let result: string;
        if (Number(bmi) <= 18) {
            result = '痩せ型';
        } else if (Number(bmi) <= 25) {
            result = '標準';
        } else {
            result = '肥満';
        }
        setResult(result);
    }, [bmi]);

    /**
     * BMIの判定結果を管理するstate
     */
    const [result, setResult] = useState<string>('');


    function calcBMI() {
        const heightMeter = heightCm / 100;
        const bmiValue = Math.round(weight / (heightMeter * heightMeter));
        setBmi(bmiValue.toString());
    }

    return (
        <>
            BMI判定

            <br/>
            <br/>

            <label>{bmi}</label>

            <br/>
            <br/>

            <label>{result}</label>

            <br/>
            <br/>

            身長(cm)<NumberInput value={heightCm} onValueChange={setHeightCm}></NumberInput>
            体重(kg)<NumberInput value={weight} onValueChange={setWeight}></NumberInput>

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