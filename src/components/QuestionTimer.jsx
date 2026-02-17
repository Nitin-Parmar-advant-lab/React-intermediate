import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeout, mode }) {
    const [reaminingTime, setRemaingintTime] = useState(timer);

    useEffect(() => {
        // console.log("SET TIMEOUT");

        const timeout = setTimeout(onTimeout, timer);

        return () => {
            clearTimeout(timeout);
        };

    }, [timer, onTimeout]);

    useEffect(() => {
        const cleanInterval = setInterval(() => {
            setRemaingintTime((prevRemaingtime) => prevRemaingtime - 100);
        }, 100);

        return () => clearInterval(cleanInterval);
        
    }, []);

    return (
        <progress
            id="question-timepr"
            max={timer}
            value={reaminingTime}
            className={mode}
        ></progress>
    );
}
