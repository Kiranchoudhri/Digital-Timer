// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    totalTime: 25 * 60,
    isRunning: false,
    limit: 25,
  }

  increaseLimit = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        limit: prevState.limit + 1,
        totalTime: (prevState.totalTime / 60 + 1) * 60,
      }))
    }
  }

  decreaseLimit = () => {
    const {isRunning, limit} = this.state
    if (!isRunning) {
      if (limit > 0) {
        this.setState(prevState => ({
          limit: prevState.limit - 1,
          totalTime: (prevState.totalTime / 60 - 1) * 60,
        }))
      } else {
        this.setState({limit: 0})
      }
    }
  }

  onClickStartTimer = () => {
    this.timerId = setInterval(this.startTimer, 1000)
  }

  startTimer = () => {
    const {limit, totalTime} = this.state

    if (totalTime > 0) {
      this.setState(prevState => ({
        isRunning: true,
        totalTime: prevState.totalTime - 1,
      }))
    } else {
      this.onClickPauseTimer()
    }
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({totalTime: 25 * 60, isRunning: false})
  }

  onClickPauseTimer = () => {
    this.setState({isRunning: false})
    clearInterval(this.timerId)
  }

  render() {
    const {isRunning, totalTime, limit} = this.state

    const timeInMinutes = Math.floor(totalTime / 60)
    const timeInSeconds = Math.floor(totalTime - timeInMinutes * 60)

    const minutesFormat =
      timeInMinutes < 10 ? `0${timeInMinutes}` : timeInMinutes
    const secondsFormat =
      timeInSeconds < 10 ? `0${timeInSeconds}` : timeInSeconds

    const dynamicBtn = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="bgContainer">
        <h1 className="heading">Digital Timer</h1>
        <div className="contentContainer">
          <div className="backgroundWrapper">
            <div className="timeWrapper">
              <h1 className="timer">{`${minutesFormat}:${secondsFormat}`}</h1>
              <p className="timerStatus">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="controlsContainer">
            <div className="startResetContainer">
              <div className="start">
                <button
                  className="startBtn"
                  type="button"
                  onClick={
                    isRunning ? this.onClickPauseTimer : this.onClickStartTimer
                  }
                >
                  <img
                    className="playImage"
                    alt={isRunning ? 'pause icon' : 'play icon'}
                    src={dynamicBtn}
                  />
                  <p className="startTitle">{isRunning ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="reset">
                <button
                  className="resetBtn"
                  type="button"
                  onClick={this.resetTimer}
                >
                  <img
                    className="resetImage"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                </button>
                <p className="resetTitle">Reset</p>
              </div>
            </div>
            <div className="timerLimitContainer">
              <p className="timerlimitTitle">Set Timer Limit</p>
              <div className="limitControlContainer">
                <button
                  className="plus"
                  type="button"
                  onClick={this.increaseLimit}
                >
                  +
                </button>
                <p className="limitBtn">{limit}</p>
                <button
                  className="minus"
                  type="button"
                  onClick={this.decreaseLimit}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
