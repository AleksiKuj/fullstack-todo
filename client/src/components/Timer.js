import { useState, useEffect } from "react"
import audio from "../assets/alarm_sound.mp3"
import { Divider, Button, ButtonGroup, Text } from "@chakra-ui/react"

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
      <Text fontSize="lg" mt={5}>
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <ButtonGroup mb={2}>
        <Button onClick={togglePlay} colorScheme={`${play ? "red" : "green"}`}>
          {play ? "Stop" : "Start"}
        </Button>

        <Button onClick={resetTime} colorScheme="purple">
          {" "}
          Reset
        </Button>

        {!isBreakMode ? (
          <Button onClick={() => switchMode("break")} colorScheme="blue">
            {" "}
            Short break
          </Button>
        ) : (
          <Button onClick={() => switchMode("pomodoro")} colorScheme="orange">
            {" "}
            Pomodoro
          </Button>
        )}
      </ButtonGroup>
      <Divider />
    </div>
  )
}

export default Timer
