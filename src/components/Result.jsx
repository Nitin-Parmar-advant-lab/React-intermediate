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
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
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
                    return (
                        <tr key={resultRow.year}>
                            <td>{resultRow.year}</td>
                            <td>
                                {formatter.format(resultRow.valueEndOfYear)}
                            </td>
                            <td>{formatter.format(resultRow.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInvested)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
