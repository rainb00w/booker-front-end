import ChartTraning from "../ChartTraning";
import s from "./ChartModal.module.css";


export default function ChartModal() {
    return (
        <div className={s.modalBox}>
            <ChartTraning />
        </div>
    );
}