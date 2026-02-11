import { useState } from "react";

export default function Player({
    initialName,
    symbol,
    isActive,
    onChangeName
}) {
    const [playerName, setPlayerNAme] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function updateEditStatus() {
        // !isEditing ? setIsEditing(true) : setIsEditing(false)
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerNAme(event.target.value);
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {isEditing ? (
                    <input
                        type="text"
                        required
                        value={playerName}
                        onChange={handleChange}
                    ></input>
                ) : (
                    <span className="player-name">{playerName}</span>
                )}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={updateEditStatus}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
