import './index.css'

const Scorecard = props => {
  const {score, playAgain} = props

  return (
    <div className="scorecard-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
        className="trophy-image"
      />

      <p>YOUR SCORE</p>

      <p>{score}</p>

      <button
        type="button"
        onClick={playAgain}
        className="play-again-button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
        />
        PLAY AGAIN
      </button>
    </div>
  )
}

export default Scorecard