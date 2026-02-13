import { useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom'

export default function ResultModel({
    ref,
    remainingTime,
    targetTime,
    onReset,
}) {
    const dial = useRef();
    const useLost = remainingTime <= 0;
    const formattedRestTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(ref, () => {
        return {
            open() {
                dial.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog className="result-modal" ref={dial} onClose={onReset}>
            {useLost && <h2>You lost</h2>}
            {!useLost && <h2>Your Score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRestTime}</strong>{" "}
                seconds left.
            </p>
            <form method="dialog">
                <button onClick={onReset}>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
}
