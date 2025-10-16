interface TypeSelectBoxProps {
    name?: string,
    options?: ({ value: string; label: string })[]
}

export function TypeSelectBox({name, options}: TypeSelectBoxProps) {

    return (
        <div>
            <label htmlFor={name}>{name}    </label>

            {/* 選択肢リストが渡された場合、<select>をレンダリングする */}
            {options && options.length > 0 ? (

                <select name={name}>

                    {options.map((opt) => (

                        // opt.value が実際の値、opt.label が optionタグに表示される文字列
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>

                    ))}

                </select>

            ) : (

                // 選択肢リストがない場合、nameプロパティを使ってチェックボックスなどをレンダリング
                <label>

                    <input type="checkbox" name={name} />
                    {name}

                </label>

            )}
        </div>
    );
}