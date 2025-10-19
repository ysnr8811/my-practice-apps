import {text} from "node:stream/consumers";

interface NumberInputProps {
    value?: number
}

export default function NumberInput({value}: NumberInputProps) {


    return (
        <input
            type='number'
            className="bg-gray-800 text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
        ></input>
    );
}