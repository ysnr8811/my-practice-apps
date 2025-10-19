interface NumberInputProps {
    value: number
    onValueChange: (newValue: number) => void
}

export default function NumberInput({value, onValueChange}: NumberInputProps) {
    return (
        <input
            type='number'
            className="bg-gray-800 text-white border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                onValueChange(isNaN(newValue) ? 0 : newValue);
            }}
        />
    );
}