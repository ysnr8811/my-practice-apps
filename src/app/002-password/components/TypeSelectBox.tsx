interface TypeSelectBoxProps {
    name?: string,
    options?: ({ value: string; label: string })[]
}

export function TypeSelectBox({name, options}: TypeSelectBoxProps) {

    return (
        <div>
            <label htmlFor={name}>{name}    </label>

            <select className={'border'} name={name}>

                {options.map((opt) => (
                    // opt.value が実際の値、opt.label が optionタグに表示される文字列
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}

            </select>
        </div>
    );
}