import Result from "./components/Result";
import Header from "./components/Header";
import Input from "./components/Input";
import { useState } from "react";

const INITIAL_INPUT = {
    initialInvestment: 10000,
    annualInvestment: 1000,
    expectedReturn: 60,
    duration: 6,
    isYearly: true,
};

function App() {
    const [useInput, setUserInput] = useState(INITIAL_INPUT);
    // const [initialDuration, setDuration] = useState("Y");

    const inputValid = useInput.duration >= 1;

    function handleUserInput(inputField, value) {
        // const val = event.f.value
        console.log(value);
        setUserInput((inputChange) => {
            return {
                ...inputChange,
                [inputField]:
                    inputField === "isYearly" ? !inputChange.isYearly : +value,
            };
        });
    }

    return (
        <>
            <Header />
            <Input
                userInput={useInput}
                onInputChange={handleUserInput}
                // handleDurationUpdate={handleDurationUpdate}
            />

            {!inputValid && (
                <p className="center"> Enter duration greater than zero </p>
            )}
            {inputValid && <Result resultsData={useInput} />}
        </>
    );
}

export default App;
