'use client';

import { useState } from "react";
import TriggerCounter from "@/components/TriggerCounter";
import ResultCounter from "@/components/ResultCounter";

export default function Page() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Latihan Counter</h1>
      <TriggerCounter onIncrement={handleIncrement} />
      <ResultCounter count={count} />
    </div>
  );
}