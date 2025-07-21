'use client';

import { useState } from "react";

export default function TriggerCounter({ onIncrement }: { onIncrement: () => void }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    onIncrement();
  };

  return(
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => handleIncrement()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increment
      </button>
    </div>
  )
}