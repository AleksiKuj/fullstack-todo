import { useState, useEffect } from "react"
import audio from "../assets/alarm_sound.mp3"

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [time, setTime] = useState(25 * 60)
  const [isBreakMode, setIsBreakMode] = useState(false)
  const [breakTime, setBreakTime] = useState(5 * 60)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (play) {
      const intervalId = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft === 0) {
            clearInterval(intervalId)
            new Audio(audio).play()
            return 0
          }
          return timeLeft - 1
        })
      }, 1000)

      return () => clearInterval(intervalId)
    }
  }, [play])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const togglePlay = () => setPlay(!play)

  const resetTime = () => {
    if (!isBreakMode) {
      setTimeLeft(time)
    }
    if (isBreakMode) {
      setTimeLeft(breakTime)
    }
    setPlay(false)
  }
  const switchMode = (mode) => {
    if (mode === "break") {
      setIsBreakMode(true)
      setTimeLeft(breakTime)
    }
    if (mode === "pomodoro") {
      setIsBreakMode(false)
      setTimeLeft(time)
    }
    setPlay(false)
  }

  return (
    <div>
      <h1>
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <button onClick={togglePlay}> {play ? "Stop" : "Start"}</button>
      <button onClick={resetTime}> Reset</button>
      {!isBreakMode ? (
        <button onClick={() => switchMode("break")}> Short break</button>
      ) : (
        <button onClick={() => switchMode("pomodoro")}> Pomodoro</button>
      )}
    </div>
  )
}

export default Timer
