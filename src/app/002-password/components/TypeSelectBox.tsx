interface TypeSelectBoxProps {
    name?: string
}

export function TypeSelectBox({name}: TypeSelectBoxProps) {
    return (
        <div>
            <label>{name}</label>
            <select>

            </select>
        </div>
    );
}