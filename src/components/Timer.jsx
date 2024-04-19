import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [seconds, setSecond] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timerId;
    if (timerRunning) {
      timerId = setInterval(() => {
        if (seconds === 0) {
          if (minute === 0) {
            if (hour === 0) {
              clearInterval(timerId);
              alert("Time's up");
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
  }, [hour, minute, seconds, timerRunning]);

  console.log(hour);
  console.log(minute);
  console.log(seconds);
  // console.log(typeof hour);
  // console.log(typeof minute);
  // console.log(typeof seconds);

  // Button Functions
  const handlePauseTimer = () => {
    setTimerRunning(false);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Timer Countdown</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div
              onChange={(e) => {
                setHour(parseInt(e.target.value));
              }}>
              <Label htmlFor="hours">Hours</Label>
              <Input
                defaultValue="0"
                id="hours"
                max="99"
                min="0"
                type="number"
              />
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
            <span id="timer-hours">00</span>:<span id="timer-minutes">00</span>:
            {"\n                    "}
            <span id="timer-seconds">00</span>
          </div>
          <div className="mt-4">
            <div className="pause inline" onClick={handlePauseTimer}>
              <Button className="mr-2" variant="outline">
                Pause
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
