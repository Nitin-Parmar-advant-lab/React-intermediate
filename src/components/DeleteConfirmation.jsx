import { useEffect } from "react";
const TIMER = 3000;
import ProgressBar from "./ProgressBar";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

    

    useEffect(() => {
        const time = setTimeout(() => {
            onConfirm();
        }, TIMER);

        // cleanup function can be writen using return
        // this effect function can return another function which will then be executed by React right before this effect function runs again or, right before this component dismounts.
        // that mean before it's removed from the DOM.
        return () => {
            clearTimeout(time);
        };
    }, [onConfirm]);



    // here it is one dependancy
    // when adding function as a dependancy there is danger of create infinity loop
    // function(object) are recreated when component reexecute again
    // so as we know in JS even after object/function has same vlaue/task they are not same, they are created diffrently in the memory

    // so this onConfim function pointer alway diffrent in every render cycle
    // so when useEffect compare the value to the old one, it will always diffrent
    // so it will re-execute this component function

    // in this perticulor case, we wouldn't have any problem because when onConfirm called in the app component,
    // that will do this setModalIsActive(false);
    // and because of this Modal component remove this component from DOM
    // so no issue here

    // for passing function as a dependany in useEffect we can use "useCallback"
    // we have to pass that function as a argument and for that will sotre the function and changing state to the memery so it does not recreate again and again with re-execution

    // this how we can use:
    /*
    const handleRemovePlace = useCallback(function handleRemovePlace() {
            setPickedPlaces((prevPickedPlaces) =>
                prevPickedPlaces.filter(
                    (place) => place.id !== selectedPlace.current,
                ),
            );
            // setModalIsActive(false);
    
            const storedIds =
                JSON.parse(localStorage.getItem("selectedPlaced")) || [];
            localStorage.setItem(
                "selectedPlaced",
                JSON.stringify(
                    storedIds.filter((id) => id !== selectedPlace.current),
                ),
            );
    }, []);    
    */

    return (
        <div id="delete-confirmation">
            <h2>Are you sure?</h2>
            <p>Do you really want to remove this place?</p>
            <div id="confirmation-actions">
                <button onClick={onCancel} className="button-text">
                    No
                </button>
                <button onClick={onConfirm} className="button">
                    Yes
                </button>
            </div>
            <ProgressBar timer={TIMER}/>
        </div>
    );
}
