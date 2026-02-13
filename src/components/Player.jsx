import { useState, useRef } from "react";


export default function Player() {
    // useRef is react Hook, Hooks are special functions
    
    // ReactJS Refs are used to access and modify the DOM elements in the React Application. It creates a reference to the elements and uses it to modify them.

    const playerName = useRef();

    const [initialEnterName, setEnterName] = useState(null);

    function handleClick() {
        setEnterName(playerName.current.value);
        playerName.current.value = ''
    }
    return (
        <section id="player">
            <h2>
                Welcome {initialEnterName ?? "unknown entity"}
                {/* "??" is short cut way to write this type of conitions 
                    initialEnterName ? initialEnterName : "unknown entity"
                */}
            </h2>
            <p>
                <input type="text" ref={playerName} />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}