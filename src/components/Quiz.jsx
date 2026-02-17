import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);

    const activeQuetionIndex = userAnswer.length;

    const isQuizComplete = activeQuetionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
        setUserAnswer((prevAnswer) => {
            return [...prevAnswer, answer];
        });
    }, []);

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer],
    );

    if (isQuizComplete) {
        return <Summary userAnswers={userAnswer} />;
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuetionIndex}
                onSelectAnswer={handleSelectAnswer}
                onTimeout={handleSkipAnswer}
                index={activeQuetionIndex}
            />
        </div>
    );
}
