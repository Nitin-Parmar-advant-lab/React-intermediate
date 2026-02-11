import { calculateInvestmentResults, formatter } from "../util/investment.js";
export default function Result({ resultsData }) {
    const results = calculateInvestmentResults(resultsData);
    const initialInvestment =
        results[0].valueEndOfYear -
        results[0].interest -
        results[0].annualInvestment;
    console.log(resultsData);
    return (
        <table id="result">
            <thead>
                <tr>
                    <th>{resultsData.isYearly ? "Year" : "Month"}</th>
                    <th>Investment Value</th>
                    <th>
                        {" "}
                        Interest
                        {resultsData.isYearly ? " (Year)" : " (Month)"}
                    </th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                    {!resultsData.isYearly && <th>Interest (Monthly)</th>}
                </tr>
            </thead>
            <tbody>
                {results.map((resultRow) => {
                    const totalInterest =
                        resultRow.valueEndOfYear -
                        resultRow.annualInvestment * resultRow.year -
                        initialInvestment;

                    const totalAmountInvested =
                        resultRow.valueEndOfYear - totalInterest;

                    const monthlyInterest = resultRow.interest / 12;
                    return (
                        <tr key={resultRow.year}>
                            <td>{resultRow.year}</td>
                            <td>
                                {formatter.format(resultRow.valueEndOfYear)}
                            </td>
                            <td>{formatter.format(resultRow.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInvested)}</td>

                            {!resultsData.isYearly && (
                                <td>{formatter.format(monthlyInterest)}</td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
