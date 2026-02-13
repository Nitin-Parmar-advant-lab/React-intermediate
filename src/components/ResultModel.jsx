import { useImperativeHandle, useRef } from "react";

export default function ResultModel({ ref, result, targetTime }) {
const dial = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dial.current.showModal();
            }
        }
    });

    return (
        <dialog className="result-modal" ref={dial}>
            <h2>You {result}</h2>
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>X second left.</strong>
            </p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
}
