import { useState } from 'react';

const useCounter = (
  initialCount: number = 0
): [number, (amount: number) => void, (amount: number) => void] => {
  const [count, setCount] = useState<number>(initialCount);

  const add = (amount: number = 1) => {
    setCount(count + amount);
  }

  const subtract = (amount: number = 1) => {
    setCount(count - amount);
  }

  return [count, add, subtract];
}

export default useCounter;