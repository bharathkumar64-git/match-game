import {Component} from 'react'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)

    const {imagesList} = props

    this.state = {
      score: 0,
      time: 60,
      activeTabId: 'FRUIT',
      isGameOver: false,
      matchImage: imagesList[0].imageUrl,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.decreaseTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  decreaseTime = () => {
    this.setState(prevState => {
      if (prevState.time === 1) {
        clearInterval(this.timerId)

        return {
          time: 0,
          isGameOver: true,
        }
      }

      return {
        time: prevState.time - 1,
      }
    })
  }

  clickTab = tabId => {
    this.setState({
      activeTabId: tabId,
    })
  }

  clickThumbnail = imageUrl => {
    const {imagesList} = this.props
    const {matchImage} = this.state

    if (imageUrl === matchImage) {
      const randomIndex = Math.floor(Math.random() * imagesList.length)

      this.setState(prevState => ({
        score: prevState.score + 1,
        matchImage: imagesList[randomIndex].imageUrl,
      }))
    } else {
      clearInterval(this.timerId)

      this.setState({
        isGameOver: true,
      })
    }
  }

  playAgain = () => {
    const {imagesList} = this.props

    clearInterval(this.timerId)

    this.setState(
      {
        score: 0,
        time: 60,
        activeTabId: 'FRUIT',
        isGameOver: false,
        matchImage: imagesList[0].imageUrl,
      },
      () => {
        this.timerId = setInterval(this.decreaseTime, 1000)
      },
    )
  }

  renderHeader = () => {
    const {score, time} = this.state

    return (
      <ul className="navbar">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
        </li>

        <li className="score-time-container">
          <p>
            Score: <span>{score}</span>
          </p>

          <div className="timer-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p>{time} sec</p>
          </div>
        </li>
      </ul>
    )
  }

  renderScorecard = () => {
    const {score} = this.state

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
          onClick={this.playAgain}
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

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTabId, matchImage, isGameOver} = this.state

    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )

    return (
      <div className="game-container">
        {this.renderHeader()}

        {isGameOver ? (
          this.renderScorecard()
        ) : (
          <div className="game-body">
            <img src={matchImage} alt="match" className="match-image" />

            <ul className="tabs-list">
              {tabsList.map(eachTab => (
                <li key={eachTab.tabId}>
                  <button
                    type="button"
                    onClick={() => this.clickTab(eachTab.tabId)}
                    className={
                      eachTab.tabId === activeTabId ? 'active-tab' : ''
                    }
                  >
                    {eachTab.displayText}
                  </button>
                </li>
              ))}
            </ul>

            <ul className="thumbnails-list">
              {filteredImages.map(eachImage => (
                <li key={eachImage.id}>
                  <button
                    type="button"
                    onClick={() => this.clickThumbnail(eachImage.imageUrl)}
                  >
                    <img src={eachImage.thumbnailUrl} alt="thumbnail" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
