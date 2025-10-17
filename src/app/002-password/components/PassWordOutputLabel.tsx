interface PassWordOutputLabelProps {
    // 親から受け取る 'password' のPropsを定義
    password: string;
}

export default function PassWordOutputLabel({password}: PassWordOutputLabelProps) {
    return (
        <label>
            {password}
        </label>
    );
}