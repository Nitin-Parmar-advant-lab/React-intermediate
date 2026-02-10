import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [activePlayer, setActivePlayer] = useState("X");

    function handleSelectSquare(rowIndex, colIndex) {
        setActivePlayer((curActivePlayer) =>
            curActivePlayer === "X" ? "O" : "X",
        );
        setGameTurns((prevTurns) => {
            let curruntPlayer = "X";

            if (prevTurns.length > 0 && prevTurns[0].player === "X") {
                curruntPlayer = "O";
            }

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: curruntPlayer,
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }
    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="player-1"
                        symbol="X"
                        isActive={activePlayer === "X"}
                    />
                    <Player
                        initialName="player-2"
                        symbol="O"
                        isActive={activePlayer === "O"}
                    />
                </ol>
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    activePlayerSymbol={activePlayer}
                />
            </div>
            <Log />
        </main>
    );
}

export default App;

// stoped at video 85
// start from 86