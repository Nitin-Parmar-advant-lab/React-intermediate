import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";
function App() {
    return (
        <>
            <Player />
            <div id="challenges">
                <TimerChallenge title={"EASY"} targetTime={1}/>
                <TimerChallenge title={"INTERMEDIATE"} targetTime={5}/>
                <TimerChallenge title={"HARD"} targetTime={10}/>
                <TimerChallenge title={"FOR LEGEND"} targetTime={15}/>
            </div>
        </>
    );
}

export default App;
