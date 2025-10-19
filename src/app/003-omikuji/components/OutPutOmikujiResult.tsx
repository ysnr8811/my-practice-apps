interface PassWordOutputLabelProps {
    /**
     * 親から受け取る 'password' のPropsを定義
     */
    omikujiResult: string;
}


export default function OutPutOmikujiResult({omikujiResult}: PassWordOutputLabelProps) {


    return (
        <label>
            {omikujiResult}
        </label>
    );

}
