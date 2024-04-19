import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import soundFile from "../../reminder.mp3";

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [seconds, setSecond] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const audioRef = useRef();

  const playReminderSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.error("Audio element not found!");
    }
  };
  const handleCloseAlert = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  useEffect(() => {
    let timerId;
    if (timerRunning) {
      timerId = setInterval(() => {
        if (seconds === 0) {
          if (minute === 0) {
            if (hour === 0) {
              clearInterval(timerId);
              playReminderSong(); // Play song when time completes
              alert("Time up. Click on ok for the reminder to stop");
              handleCloseAlert();
              setTimerRunning(false);
            } else {
              setHour(hour - 1);
              setMinute(59);
              setSecond(59);
            }
          } else {
            setMinute(minute - 1);
            setSecond(59);
          }
        } else {
          setSecond(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [hour, minute, seconds, timerRunning, audioRef]);

  console.log(hour);
  console.log(minute);
  console.log(seconds);

  const handlePauseTimer = (e) => {
    // setTimerRunning(false);
    e.preventDefault();
    setTimerRunning(!timerRunning);
  };
  const handleStartTimer = (e) => {
    e.preventDefault();
    setTimerRunning(true);
  };
  const handleRestTimer = () => {
    setHour(0);
    setMinute(0);
    setSecond(0);
    setTimerRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <audio ref={audioRef} src={soundFile} preload="auto" />
      <div className="bg-gray-200 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Timer Countdown</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div
              onChange={(e) => {
                setHour(parseInt(e.target.value));
              }}>
              <Label htmlFor="hours">Hours</Label>
              <Input defaultValue="0" type="number" />
            </div>
            <div
              onChange={(e) => {
                setMinute(parseInt(e.target.value));
              }}>
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                defaultValue="0"
                id="minutes"
                max="59"
                min="0"
                type="number"
              />
            </div>
            <div
              onChange={(e) => {
                setSecond(parseInt(e.target.value));
              }}>
              <Label htmlFor="seconds">Seconds</Label>
              <Input
                defaultValue="0"
                id="seconds"
                max="59"
                min="0"
                type="number"
              />
            </div>
          </div>
          <div className="Start" onClick={handleStartTimer}>
            <Button className="w-full" type="submit">
              Start Timer
            </Button>
          </div>
        </form>
        <div className="mt-8 text-center">
          <div className="text-6xl font-bold text-primary">
            {hour < 10 ? (
              <span id="timer-hours">0{hour}:</span>
            ) : (
              <span id="timer-hours">{hour}:</span>
            )}
            {minute < 10 ? (
              <span id="timer-minutes">0{minute}:</span>
            ) : (
              <span id="timer-minutes">{minute}:</span>
            )}
            {seconds < 10 ? (
              <span id="timer-seconds">0{seconds}</span>
            ) : (
              <span id="timer-seconds">{seconds}</span>
            )}
          </div>
          <div className="mt-4">
            <div className="pause inline" onClick={handlePauseTimer}>
              <Button className="mr-2" variant="">
                {timerRunning ? <h1>Pause</h1> : <h1>Play</h1>}
              </Button>
            </div>
            <div className="Reset inline" onClick={handleRestTimer}>
              <Button className="ml-2" variant="outline">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
