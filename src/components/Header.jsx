import quiz from '../assets/quiz-logo.png'

export default function Header() {
    return <header>
        <img src={quiz} alt="quiz-logo" />
        <h1>REACTQUIZ</h1>
    </header>;
}
