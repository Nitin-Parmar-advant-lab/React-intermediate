import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// useEffect

// Side effects: that are "tasks" that don't impact the curruent component render cycle
// mean they don't directly impact  the curruent compomnent render cycle

// using useEffect is not good idea because it start another extra execution cycle that's triggered after the App component execution

const storedIds = JSON.parse(localStorage.getItem("selectedPlaced")) || [];
const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id === id),
);

function App() {
    const selectedPlace = useRef();
    const [modalIsOpen, setModalIsActive] = useState(false);

    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
    const [avaiblePlaces, setAvailablePlaces] = useState([]);

    /*
    // useEffect does not return any value,
    // instead, it take two arguments
    // first fucntion that wrap side effect code, second one is array of dependencies

    // useEffect code will be ececut after the App componenct execution finishe
    // then this side effect (useEffect) code will be execute

    // we are also updateing the state in useEffect so that will rerender the App component
    // and then again useEffect will be executed with some conition
    // if array of dependencies is defined, then react will look at the dependencies specified there and it will only execute this effect function again if:
    // "the dependency values changed"

    // not needed the extra useEffect because both useEffect work is diffrent
    // this is for fixed static time which get the sotres id, but second one is not synchrozied function it maytake time
    // so here it is redundunt
    // we can move logic to the top and use storedPlaces with pickdPlaced

    // useEffect(() => {
    //     const storedIds =
    //         JSON.parse(localStorage.getItem("selectedPlaced")) || [];
    //     const storedPlaces = storedIds.map((id) =>
    //         AVAILABLE_PLACES.find((place) => place.id === id),
    //     );
    //     setPickedPlaces(storedPlaces);
    // }, []);

    */

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(
                AVAILABLE_PLACES,
                position.coords.latitude,
                position.coords.longitude,
            );
            console.log(position.coords.latitude, position.coords.longitude);
            setAvailablePlaces(sortedPlaces);
        });
    }, []);

    /*
    // this is side effect, it is not part of regulor flow
    // this navigator provided by browser {part of BOM}

    navigator.geolocation.getCurrentPosition((position) => {
        // returns array
        const sortedPlaces = sortPlacesByDistance(
            AVAILABLE_PLACES,
            position.coords.latitude,
            position.coords.longitude,
        );

        // if we update location state here then it will be infinite loop,
        // becase currently it is part of normal flow of rect
        // so we have to use useEffect to solve this problem

        setAvailablePlaces(sortedPlaces)
    });
    */

    function handleStartRemovePlace(id) {
        setModalIsActive(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setModalIsActive(false);
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        // here sideEffect not needed
        // and we can't even user here
        // remember it is hook and it should be at to of the any component and can not be wraped arround any function or condition or loop
        const storedIds =
            JSON.parse(localStorage.getItem("selectedPlaced")) || [];
        if (storedIds.indexOf(id) === -1) {
            localStorage.setItem(
                "selectedPlaced",
                JSON.stringify([id, ...storedIds]),
            );
        }
    }

    const handleRemovePlace = useCallback(function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter(
                (place) => place.id !== selectedPlace.current,
            ),
        );
        setModalIsActive(false);

        const storedIds =
            JSON.parse(localStorage.getItem("selectedPlaced")) || [];
        localStorage.setItem(
            "selectedPlaced",
            JSON.stringify(
                storedIds.filter((id) => id !== selectedPlace.current),
            ),
        );
    }, []);

    return (
        <>
            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe" />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to
                    visit or you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="I'd like to visit ..."
                    fallbackText={
                        "Select the places you would like to visit below."
                    }
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available Places"
                    fallbackText="Sorting places by distance.."
                    places={avaiblePlaces}
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}

export default App;
