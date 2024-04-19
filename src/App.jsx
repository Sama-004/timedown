import { useState } from "react";

export default function App() {
  const [hours, setHours] = useState("HH");
  const [minutes, setMinutes] = useState("MM");
  const [seconds, setSeconds] = useState("SS");
  return (
    <div>
      <h1 className="bg-red-900">Testing tailwind</h1>
    </div>
  );
}
